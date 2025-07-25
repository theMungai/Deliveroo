from fastapi import APIRouter, HTTPException, Response, status, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.weight_category import WeightCategory
from app.schemas.weight_category import WeightCategoryCreate, WeightCategoryOut

router = APIRouter(prefix="/weight-categories", tags=["Weight Categories"])


@router.get("/", response_model=list[WeightCategoryOut])
def get_categories(db:Session = Depends(get_db)):
    categories = db.query(WeightCategory).all()
    return categories


@router.get("/{id}", response_model=WeightCategoryOut)
def get_category_by_id(id : int, db: Session = Depends(get_db)):
    category = db.query(WeightCategory).filter(WeightCategory.id == id).first()

    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id {id} was not found.")
    return category


@router.post("/", response_model=WeightCategoryCreate,status_code=status.HTTP_201_CREATED)
def create_category(category : WeightCategoryCreate, db : Session = Depends(get_db)):
    new_category = WeightCategory(**category.dict())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return category


@router.delete("/{id}",status_code=status.HTTP_204_NO_CONTENT)
def delete_category(id : int, db : Session = Depends(get_db)):
    category = db.query(WeightCategory).filter(WeightCategory.id == id).first()

    if category == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id {id} was not found.")
    db.delete(category)
    db.commit()
    return