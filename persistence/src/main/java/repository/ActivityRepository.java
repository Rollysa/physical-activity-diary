package repository;

import model.Activity;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActivityRepository extends BaseRepository<Activity> {

    List<Activity> findAllByPerformingPerson(String email);

    List<Activity> findByPerformingPersonAndDateBetweenOrderByDateAsc(String email, LocalDate lowerBound, LocalDate upperBound);
}
