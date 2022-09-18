## Real Estate web app using nodejs mongodb passportjs ejs


### Features
    - login
    - register
    - add houses
    - create order , accepted , rejected
    - search houses 

### database schema
        - House
           - title
           - price
           - description
           - location : {
               city ,
               adress : {
                  street ,
                  zip-codes
               }
           }

           - category : enum {                
                   Apartment
                   Cottage
                   Castle
                   Villa
                   family house
           }

           - business_type : enum {
                rent
                sale
           }
           
           - num bedrooms 1-5
           - num bathrooms 1-5

           - area 200-1000
           - price 200-1000
           - image
           - Owner : User
           - avalaible : Boolean

        - User 
            - username
            - email
            - password
            - first name
            - last name
            - adress : {
             - street
             - city
             - country
             - postal code
            }
            - aboutme
            - profil_image

        - Order
           - owner
           - client
           - house
           - status : enum {
               pending
               accepted
               rejected
           }
           
        - Client
           - email
           - phone
           - first name
           - last name
           - adress : {
             - street
             - city
             - country
             - postal code
            }
        




