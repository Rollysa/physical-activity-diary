package repository;

import model.Person;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends BaseRepository<Person> {

    Person findByEmail(String email);

    Person getById(Long id);
}
