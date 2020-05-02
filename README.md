# There are 2 types of DB collections

## 1. Story DB Schema

```jsx
{
  "storyNum": Number, // Number of Story
  "rows": [ // Number of rows
    { // Each row object contains the number of available spots in index+1 row
      "motorcycleSpots": Number,
      "compactSpots": Number,
      "largeSpots": Number
    }
  ]
}
```

## 2. Vehicle DB Schema

```jsx
{
"storyId" : ObjectId, // _id of the story where the vehicle is parked
"storyNum" : Number, // Number of the story where the vehicle is parked
"type" : "B", // Type of vehicle ["B", "M", "C"] -> [Bus, Motorcycle, Car]
"registrationNumber" : "5648", // Vehicles Registration Number 
"rowIndex" : Number, // Index of row (starting from 0) where the vehicle is parked
}
```

# There are 3 routes

### 1. /park-vehicle

Method - POST

Occupies space in Storeys

Adds a vehicle in Vehicles DB 

### 2. /vehicle-slot

Method - GET

Get vehicle using Registration Number 

### 3. /vehicle-count

Get vehicle count of all the vehicles
