### - Core
Contains all domain level concerns, this includes ***business logic***, and domain objects (Entities)
Transformation to DTOs should be done exclusively at the edge (our controllers), because that is where serialization happens and also because, depending on our project requirements, several controllers or services can call these methods and they will want to deal with the purest form of the data.

