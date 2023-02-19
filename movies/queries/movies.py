#using code to connect to SQL database to do "stuff"

from pydantic import BaseModel
from typing import Optional
from datetime import date 

#what data do we need for submitting a movie 
#data coming IN & and out of our endpoints in fastAPI - has nothing to do with our database
class MovieIn(BaseModel):
    title: str
    release_year : date 
    genre: str 
    duration_minutes: int
    director: str
    imbd_rating: int  
    where_to_watch : Optional[str] 

class MovieOut(BaseModel):
