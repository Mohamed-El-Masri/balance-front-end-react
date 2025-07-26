
curl -X 'POST' \
  'https://balancerealestate.runasp.net/api/Auth/register' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "userName": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string"
}'


	
Error: response status is 400

Response body

{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Email": [
      "تنسيق البريد الإلكتروني غير صحيح"
    ],
    "PhoneNumber": [
      "من فضلك أدخل رقم الهاتف بالتنسيق الدولي، مثال: +201001234567"
    ]
  },
  "traceId": "00-a3dc4e64a84620701f7ff28798211a29-91acbf36bf27860a-00"
}


Response headers
 access-control-allow-origin: * 
 content-type: application/problem+json; charset=utf-8 
 date: Sat,26 Jul 2025 01:41:20 GMT 
 server: Microsoft-IIS/10.0 
 strict-transport-security: max-age=2592000 
 x-powered-by: ASP.NET 
