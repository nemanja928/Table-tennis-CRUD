/* 

TODO: kada ciljamo rute /game/:id sa PUT radi updateovanja game-a izbaci u consoli sledece:

error: {success: false, msg: "Unable to connect to db and fetch all users."}
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure response for http://localhost:3000/API/game/5b4b2efea48ae511946bb975: 500 Internal Server Error"
name: "HttpErrorResponse"
ok: false
status: 500
statusText: "Internal Server Error"
url: "http://localhost:3000/API/game/5b4b2efea48ae511946bb975"


TODO: kada ciljamo /team/:id ili group/:id sa PUT radi updateovanja team-a/user-a ili grupe izbaci u consoli (iako GET radi)

error: {success: false, msg: "User is not authenticated!"}
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure response for http://localhost:3000/API/users/5b3bae1a43bb661294677e5c: 403 Forbidden"
name: "HttpErrorResponse"
ok: false
status: 403
statusText: "Forbidden"
url: "http://localhost:3000/API/users/5b3bae1a43bb661294677e5c"


TODO: kada ciljamo /cup/:id sa PUT u consoli ne izbaci nista ali server izbaci gresku

PUT /API/cup/5b4f8e0c0a22af4478def687 - - ms - -
(node:15072) UnhandledPromiseRejectionWarning: TypeError: req.body.groups.split is not a function
    at CupController.<anonymous> (E:\Projekti\tte\server\public\controllers\cup.server.controller.js:166:54)
    at Generator.next (<anonymous>)
    at fulfilled (E:\Projekti\tte\server\public\controllers\cup.server.controller.js:4:58)
(node:15072) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 3)

Ovo je mozda zato sto kod updateovanja, samo uzmemo primljeni Cup objekat, izmenimo odredjene njegove propertije, i onda ga PUT-ujemo nazad.
Taj objekat grupe unutar kupa sadrzi kao niz, a ovo izgleda ocekuje string (posto pokusava da splituje)?
Mozda bi trebalo drugacije da saljemo, ili da server drugacije obradjuje.

*/




/* TODO: kada updatejuemo cup PUT-ujuci na rutu /cup/:id izmenjen vec dobijeni objekt (sa GET /cup/:id rute) izbaci gresku:

HttpErrorResponse {headers: HttpHeaders, status: 500, statusText: "Internal Server Error", url: "http://localhost:3000/API/cup/5cbef6caf2040522fcc8ec7f", ok: false, …}
error:
msg:
kind: "ObjectId"
message: "Cast to ObjectId failed for value "" at path "winner""
name: "CastError"
path: "winner"
stringValue: """"
value: ""
__proto__: Object
success: false
__proto__: Object
headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
message: "Http failure response for http://localhost:3000/API/cup/5cbef6caf2040522fcc8ec7f: 500 Internal Server Error"
name: "HttpErrorResponse"
ok: false
status: 500
statusText: "Internal Server Error"
url: "http://localhost:3000/API/cup/5cbef6caf2040522fcc8ec7f"

Greske nema kada rucno dodamo winner/second/third objekat u cup objekat




/* On group details, editing group after editing game, resets game */