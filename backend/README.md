# REST API 

root:    /api/v1                       

* /api wird für das forwarding verwenden 
* /v1 ist für die Versionierung der api

## Authentication
Resourcen für die authentifizierung.

|         | URL                          | Info                                  |
|:--------|:-----------------------------|:--------------------------------------|
|post     |/login                        |login an user
|get      |/logout                       |logout a user

## /users
Resource im Kontext eines Benutzer

|         | URL                          | Info                                  |
|:--------|:-----------------------------|:--------------------------------------|
|get      |/users                        |get a list of all users                |
|post     |/users                        |create a new user profile              |
|get      |/users/{id}                   |get user profile details               |
|delete   |/users/{id}                   |delete user profile                    |
|put      |/users/{id}                   |updates an existing user profile       |
|get      |/users/{id}/meetups           |gets all meetups for the user          |
|get      |/users/{id}/meetup-requests   |gets all meetup-requests for the user  |

## /meetups
Resource im Kontext eines Meetup

|         | URL                          | Info                                  |
|:--------|:-----------------------------|:--------------------------------------|
|get      |/meetups                      |get a list of all meetups              |
|post     |/meetups                      |create a new meetup                    |
|get      |/meetups/{id}                 |get meetup details                     |
|delete   |/meetups/{id}                 |delete a meetup                        |
|put      |/meetups/{id}                 |updates an existing meetup             |
|get      |/meetups/{id}/meetup-requests |gets all meetup-requests for a meetup  |
|get      |/meetups/{id}/chats           |gets all chat-entry for a meetup       |
|post     |/meetups/{id}/chats           |creates a new chat-entry for a meetup  |
|get      |/meetups/{id}/chats{id}       |get chat entry details from a meetup   |
|delete   |/meetups/{id}/chats{id}       |delete a chat-entry from a meetup      |
|put      |/meetups/{id}/chats{id}       |updates an existing chat-entry from a meetup |

## /meetup-requests
Resource im Kontext eines Meetup Request

|         | URL                          | Info                                  |
|:--------|:-----------------------------|:--------------------------------------|
|get      |/meetup-requests              |get a list of all meetups-request      |
|post     |/meetup-requests              |creates a new meetup-request           |
|get      |/meetup-requests/{id}         |get meetup-request details             |
|delete   |/meetup-requests/{id}         |delete a meetup-request                |
|put      |/meetup-requests/{id}         |updates an existing meetup-request     |

## /halls
Resource im Kontext von Kletter Hallen

|         | URL                          | Info                                  |
|:--------|:-----------------------------|:--------------------------------------|
|get      |/halls                        |get a list of all halls                |
|get      |/halls/{id}                   |get hall details                       |
