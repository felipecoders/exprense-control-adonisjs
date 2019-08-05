# Expense Control adonisjs

Manager you expenses with this API

## Routes

| Route                 | Verb(s)   | Handler                          | Middleware | Name                     |
| --------------------- | --------- | -------------------------------- | ---------- | ------------------------ |
| /users                | POST      | UserController.create            |            | /users                   |
| /sessions             | POST      | SessionController.create         |            | /sessions                |
| /spend-group          | HEAD,GET  | SpendGroupController.index       | auth       | spend-group.index        |
| /spend-group          | POST      | SpendGroupController.store       | auth       | spend-group.store        |
| /spend-group/:id      | HEAD,GET  | SpendGroupController.show        | auth       | spend-group.show         |
| /spend-group/:id      | PUT,PATCH | SpendGroupController.update      | auth       | spend-group.update       |
| /spend-group/:id      | DELETE    | SpendGroupController.destroy     | auth       | spend-group.destroy      |
| /spend                | HEAD,GET  | SpendController.index            | auth       | spend.index              |
| /spend                | POST      | SpendController.store            | auth       | spend.store              |
| /spend/:id            | HEAD,GET  | SpendController.show             | auth       | spend.show               |
| /spend/:id            | PUT,PATCH | SpendController.update           | auth       | spend.update             |
| /spend/:id            | DELETE    | SpendController.destroy          | auth       | spend.destroy            |
| /user-spend-group     | HEAD,GET  | UserSpendGroupController.index   | auth       | user-spend-group.index   |
| /user-spend-group     | POST      | UserSpendGroupController.store   | auth       | user-spend-group.store   |
| /user-spend-group/:id | HEAD,GET  | UserSpendGroupController.show    | auth       | user-spend-group.show    |
| /user-spend-group/:id | PUT,PATCH | UserSpendGroupController.update  | auth       | user-spend-group.update  |
| /user-spend-group/:id | DELETE    | UserSpendGroupController.destroy | auth       | user-spend-group.destroy |
