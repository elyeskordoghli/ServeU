### - Infrastructure
Includes all outside services, that we could change them any time without touching ou bussness logic code (Database data access, push notification service, ...)
###### Repositories

>According to Martin Fowler, the Repository Pattern can be described as:
Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.
So a repository will generally have methods such as findOne, findAll, remove, and such. Your service layer will manipulate the collection through these repository methods. Their implementation is not a concern to our business logic.

The repository is an intermediary between the domain and the data source and ***provides the services with the basic extraction operations (CRUD)*** (findOne, findAll, updateOne, remove).

When using TypeOrm, the CRUD methods are injected by the ORM to our repository, being able to define more specific methods (that do not imply business logic) in the repository file.