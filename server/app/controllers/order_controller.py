from app.database.db import db
from app.models.order import Order
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id= client_id, user_id= user_id, estimated_delivery_date= estimated_date, total=total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_service(name, description, price):
    service = Service(name= name, description= description, price= price)
    db.session.add(service)
    db.session.commit()
    return service

def add_garment(order_id, type, description, notes):
    garment = Garment(order_id=order_id, type = type, description=description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail(garment_id, service_id, quantity):
    order_detail = OrderDetail(garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail

def get_order_detail(order_id):
    #La busqueda de debemos hacer:
    #Cliente, garments
    #cada garment debe traer su servicio
    order = Order.query.get(order_id)
    print("##############ORDER#########", order.to_dict())
    order_data = {
        "order_id": order.id,
        "client": order.clients.name,
        "status": order.state,
        "garments": []
    }
    garments = Garment.query.filter_by(order_id= order.id)
    
    for garment in garments:
        print("##############GARMENT#######", garment.to_dict())
        garment_data = {
            "type": garment.type,
            "description": garment.description,
            "observations": garment.observations,
            "services": []
        }
        for gs in garment.order_detail:
            service = Service.get(gs.service_id)           
            print("##############GS#########", service.to_dict())
            service_data = {
                "name": service.name,
                "description": service.description,
                "price": service.price
            }
            garment_data["services"].append(service_data)
    order_data["garments"].append(garment_data)
    return order_data

def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state = new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter_by(state=status).all()
    data = [{
        "id": o.id,
        "client_id": o.client_id,
        "status": o.state,
        "estimated_delivery_date": o.estimated_delivery_date,
        "total": o.total,
        "pagado": o.pagado
    } for o in orders]
    return data
