# Bazy danych 2
## lab07 - zad01

AppEndpoints (all starts with `/items`)

- GET - get all
- GET /{id} - get one by id
- GET/rapport - generate rapport
- POST - create new item
- PUT /{id} - update item
- DELETE /{id} - remove by id
### Example `config.env`

```env
MONGO_URI=mongodb://localhost:27017
PORT=3000
```

### Example query

`/items?filter={"unit":"t"}&sort={"price":-1}`

Get all, with units "t", sort by price

```json
[
    {
        "_id": "63c3d73b66a05e9b11340562",
        "name": "beton",
        "price": 100,
        "description": "",
        "amount": 10,
        "unit": "t"
    },
    {
        "_id": "63c3d834950f3911373b7f1b",
        "name": "cement",
        "price": 50,
        "description": "",
        "amount": 25,
        "unit": "t"
    }
]
```

### Example rapport

```json
[
    {
        "total_value": 4338,
        "items": [
            {
                "name": "beton",
                "price": 100,
                "amount": 10,
                "value": 1000
            },
            {
                "name": "cement",
                "price": 50,
                "amount": 25,
                "value": 1250
            },
            {
                "name": "wiaderko",
                "price": 12,
                "amount": 174,
                "value": 2088
            }
        ]
    }
]
```
