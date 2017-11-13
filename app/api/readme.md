### API

#### 1. Get tinder profiles

##### Request
```
Request URL: /api/profiles
Method: GET

```
##### Response
```
{
_id: "59fb607c586cc5472bac8d68",
name: "Diksha",
age: "24",
bio: "Lawyer",
__v: 0,
score: 0,
images: [
        {
        src:"<image-url-here>",
        uuid: "443da856-593f-4345-b167-42b2f530982e",
        _id: "59fb607c586cc5472bac8d6c",
        score: [ ]
        }
    ]
}
```

#### 1. Rate an image of profile

##### Request
```
Request URL: /api/rate
Method: PUT
Body:
{
	"id": "59fb607c586cc5472bac8d6c",
	"score": [4,3]
}

```
##### Response
```
{
    message: 'successfully updated'
}
```