from config import app,db
from flask import request,jsonify
from models import Contact

@app.route('/contacts',methods=['GET'])
def get_contacts():
    contacts=Contact.query.all()
    json_contacts=list(map(lambda x:x.to_json(),contacts))
    return jsonify({'contacts':json_contacts})

@app.route('/create_contact',methods=['POST'])
def create_contact():
    first_name=request.json.get('firstName')
    last_name=request.json.get('lastName')
    email=request.json.get('email')
    if not first_name or not last_name or not email:
        return (jsonify({'Message':'Incorrect Parameters'}),400)
    new_contact=Contact(first_name=first_name,last_name=last_name,email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return (jsonify({'Message':str(e)}),400)
    return (jsonify({'Message':'Contact Created','contact':new_contact.to_json()}),201)

@app.route('/update_contact/<int:user_id>',methods=['PATCH'])
def update_contact(user_id):
    contact=Contact.query.get(user_id)
    if not contact:
        return (jsonify({'Message':'User not found'}),404)
    data=request.json
    contact.first_name=data.get('firstName',contact.first_name)
    contact.last_name=data.get('firstName',contact.last_name)
    contact.email=data.get('firstName',contact.email)
    try:
        db.session.commit()
    except Exception as e:
        return (jsonify({'Message':str(e)}),400)
    return (jsonify({'Message':'Contact Updated','contact':contact.to_json()}),200)
    
@app.route('/delete_contact/<int:user_id>',methods=['DELETE'])
def delete_contact(user_id):
    contact=Contact.query.get(user_id)
    if not contact:
        return (jsonify({'Message':'User not found'}),404)
    try:
        db.session.delete(contact)
        db.session.commit()
    except Exception as e:
        return (jsonify({'Message':str(e)}),400)
    return (jsonify({'Message':'Contact Deleted'}),200)
    

if __name__=='__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)