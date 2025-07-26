
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.parcel import ParcelCreate, ParcelOut, ParcelUpdate
from app.models.parcel import Parcel
from app.models.user import User
from app.models.weight_category import WeightCategory
from sqlalchemy.inspection import inspect

router = APIRouter(prefix="/parcels", tags=["Parcels"])

# Get parcels for a specific user
@router.get("/user/{user_id}", response_model=list[ParcelOut], status_code=status.HTTP_200_OK)
def get_user_parcels(user_id: int, db: Session = Depends(get_db)):
    parcels = db.query(Parcel).filter(Parcel.user_id == user_id).all()
    return parcels


@router.get("/", response_model=list[ParcelOut], status_code=status.HTTP_200_OK)
def get_parcels(db : Session = Depends(get_db)):
    parcels = db.query(Parcel).all()
    return parcels

@router.get("/{id}", response_model=ParcelOut)
def get_parcel_by_id(id : int, db : Session = Depends(get_db)):
    parcel = db.query(Parcel).filter(Parcel.id == id).first()

    if not parcel: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Parcel with {id} was not found.")
    
    return parcel  


@router.post("/", response_model=ParcelOut)
def create_parcel(parcel: ParcelCreate, db: Session = Depends(get_db)):
    try:
        parcel_data = parcel.dict()

        # Auto-assign weight category
        weight_category = db.query(WeightCategory).filter(
            WeightCategory.min_weight <= parcel.weight,
            WeightCategory.max_weight >= parcel.weight
        ).first()

        if not weight_category:
            raise HTTPException(status_code=400, detail="No matching weight category found for the given weight.")

        parcel_data["weight_category_id"] = weight_category.id
        parcel_data["status"] = "Pending"

        new_parcel = Parcel(**parcel_data)
        db.add(new_parcel)
        db.commit()
        db.refresh(new_parcel)

        return new_parcel

    except Exception as e:
        print(f"Error creating parcel: {e}")  # You’ll see this in your Render logs
        raise HTTPException(status_code=500, detail=str(e))




@router.put("/{id}", response_model=ParcelOut, status_code=status.HTTP_200_OK)
def update_parcel(id: int, updated_parcel: ParcelUpdate, db: Session = Depends(get_db)):
    parcel_query = db.query(Parcel).filter(Parcel.id == id)
    parcel = parcel_query.first()

    if parcel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Parcel with id {id} was not found."
        )

    update_data = updated_parcel.dict(exclude_unset=True)

    # Filter only valid columns
    valid_columns = {col.key for col in inspect(Parcel).mapper.column_attrs}
    safe_data = {key: value for key, value in update_data.items() if key in valid_columns}

    parcel_query.update(safe_data, synchronize_session=False)
    db.commit()
    return parcel_query.first()



@router.patch("/{id}", response_model=ParcelOut)
def update_parcel(id: int, parcel_data: ParcelUpdate, db: Session = Depends(get_db)):
    parcel = db.query(Parcel).filter(Parcel.id == id).first()
    if not parcel:
        raise HTTPException(status_code=404, detail="Parcel not found")

    for key, value in parcel_data.dict(exclude_unset=True).items():
        setattr(parcel, key, value)

    print(f"PATCH /parcels/{id} - data: {parcel_data}")
    db.commit()
    db.refresh(parcel)
    return parcel
    
    # return {"msg": f"Parcel {id} was updated"}


