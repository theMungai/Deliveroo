from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.parcel import ParcelCreate, ParcelOut, ParcelUpdate
from app.models.parcel import Parcel


router = APIRouter(prefix="/parcels", tags=["Parcels"])


@router.get("/parcels", response_model=list(ParcelOut), status_code=status.HTTP_200_OK)
def get_parcels(db : Session = Depends(get_db)):
    parcels = db.query(Parcel).all()
    return parcels

@router.get("/parcels/{id}", response_model=ParcelOut)
def get_parcel_by_id(id : int, db : Session = Depends(get_db)):
    parcel = db.query(Parcel).filter(Parcel.id == id).first()

    if not parcel: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Parcel with {id} was not found.")
    
    return {"parcel_detail" : parcel}


@router.post("/parcels/", response_model=ParcelOut)
def create_parcel(parcel : ParcelCreate, db: Session = Depends(get_db)):
    new_parcel = Parcel(**parcel.dict())
    db.add(new_parcel)
    db.commit()
    db.refresh(new_parcel)
    return {"data" : new_parcel}


@router.put("/parcels/{id}", status_code=status.HTTP_200_OK)
def update_parcel(id : int, updated_parcel : ParcelUpdate , db : Session = Depends(get_db)):
    parcel_query = db.query(Parcel).filter(Parcel.id == id)

    parcel = parcel_query.first()
    if parcel == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Parcel with {id} was not found.")
    parcel_query.update(update_parcel.dict(), synchronize_session=False)
    db.commit()
    return {"data" : updated_parcel}


@router.delete("/parcels/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_parcel(id : int, db : Session = Depends(get_db)):
    parcel = db.query(Parcel).filter(Parcel.id == id).first()

    if parcel == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Parcel with id {id} was not found.")
    
    parcel.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)