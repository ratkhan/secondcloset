# secondcloset
technical assessment for second closet


<!-- ABOUT THE PROJECT -->
Techincal assesment for second closet

<!-- GETTING STARTED -->
## Getting Started


### Prerequisites
Requires running instance of mongodb.
Passed as MONGODB_URI

### Installation
npm install;
npm start;


<!-- USAGE EXAMPLES -->
## Usage
Example of working system is running on 
http://15.222.247.57:3001/api/

Sytem is used in following way:
1. Creating pricing of one of the follow 4 types
'PLAIN', 'VALUE', 'VOLUME', 'NUMBER_VOLUME'.
  a) To create a plain pricing post to /api/pricing following data:
  
  ```js
   {
        "type": 'PLAIN',
        "name": 'PLAIN5',
        "flat_fee": 20,
        "discount": 0.05,
    }
  ```
   Users with this pricing will be charged 20 flat fee on each item with 5% discount
   
   b) To create a volume pricing post to /api/pricing following data
   
    {
        "type": "VOLUME",
        "name": "VOLUME1",
        "flat_fee": 20,
        "price_per_volume": 1,
    }
    
   Users with this pricing will be charged 20 flat fee on each item with extra charge of 1$ on 1 volume.
   
   c) To create a value pricing post to /api/pricing following data
   
    {
        "type": 'VALUE',
        "name": 'VALUE5',
        "flat_fee": 20,
        "price_per_value": 0.05,
    }
    
   
   Users with this pricing will be charged 20 flat fee on each item with extra charge of 5% on value of stored items.
   
   d) To create a number and volume pricing post to /api/pricing following data
   
    {
        type: 'NUMBER_VOLUME',
        name: 'NUMBER100_VOLUME2',
        flat_fee: 20,
        discount: 0.05,
        step_size: 100,
        discount_step_per_step: 0.05,
        max_discount: 0.15,
        price_per_volume: 2,
    }
    
   Users with this pricing will be charged 20 flat fee on each item with extra charge of 2% on unit of volume of stored items
    and will get 5% discount for each 100 items store. 5% on first 100, 10% on second 100, and so on up to 15%
    
2. Pricing is assigned to user through /api/users endpoint;
    a) to create user with need pricing one has to post to /api/users following request
    
    ```js
    {
      "username":"PersonFour",
      "name":"PersonWithNumberPricing",
      "pricing":"5f97850c0433fe3770ccea4d"
    }
    ```
    
    Where pricing is id referenced from previous created pricings.
      
3. To get price to store items send get request to /api/price/:user_id endpoint with items to be stored:


    ```js
  	{
	    "items":[
       {
        "name":"Fridge",
        "length": 3,
        "height" : 6,
        "width": 4,
        "weight" : 300,
        "value" : 1000
      },
      {
        "name": "Sofa",
        "length": 5,
        "height" : 4,
        "width": 3,
        "weight" : 100,
        "value" : 500
      }
      ]
    }
    ```
    
    return will calculated based on pricing assigned to a user and be return as follows:
    {
      "price": 304
    }
    
 4. To change pricing data send put request ot api/pricing with attribute that need to be changed, for example

      ```js
      { 
        "flat_fee": 25
      }
      ```
      
  This request will change the flat_fee for all pricing to 25$
 
 
