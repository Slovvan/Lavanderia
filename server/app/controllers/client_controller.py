from app.models.client import Client
from app import db

def create_client(name, phone_number, address):
    new_client = Client(name= name, phone_number=phone_number, address=address)
    db.session.add(new_client)
    db.session.commit()
    return new_client