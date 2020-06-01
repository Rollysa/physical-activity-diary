package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.core.style.ToStringCreator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "activity")
public class Activity extends BaseEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "activity_type")
    private String activityType;

    @NotBlank(message = "Activity title is required")
    @Size(max = 50, message = "Please use less than 50 characters")
    @Column(name = "title", nullable = false)
    private String title;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @Column(name = "start_time")
    private LocalTime startTime;

    @Size(max = 1000, message = "Please use less than 1000 characters")
    @Column(name = "description")
    private String description;

    @Column(name = "activity_subtype")
    private String activitySubtype;

    @Column(name = "terrain")
    private String terrain;

    @Column(name = "hours")
    private Integer hours;

    @Column(name = "minutes")
    private Integer minutes;

    @Column(name = "seconds")
    private Integer seconds;

    @Column(name = "distance")
    private Double distance;

    @Column(name = "average_heart_rate")
    private Integer averageHeartRate;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "steps")
    private Integer steps;

    @Column(name = "average_pace")
    private Double averagePace;

    @Column(name = "average_speed")
    private Double averageSpeed;

    @Column(name = "power")
    private Integer power;

    @Column(name = "cadence")
    private Integer cadence;

    @Column(name = "elevation_loss")
    private Integer elevationLoss;

    @Column(name = "elevation_gain")
    private Integer elevationGain;

    @Column(name = "lap_length")
    private Integer lapLength;

    @Column(name = "laps")
    private Integer laps;

    @Column(name = "repetitions")
    private Integer repetitions;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "performing_person")
    private String performingPerson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    @JsonIgnore
    private Person person;

    public Activity() {
    }

    public Activity(Long id, String activityType, @NotBlank(message = "Activity title is required") @Size(max = 50, message =
            "Please use less than 50 characters") String title, LocalDate date, LocalTime startTime, @Size(max = 1000, message = "Please use less than 1000 characters") String description, String activitySubtype, String terrain, Integer hours, Integer minutes, Integer seconds, Double distance, Integer averageHeartRate, Integer calories, Integer steps, Double averagePace, Double averageSpeed, Integer power, Integer cadence, Integer elevationLoss, Integer elevationGain, Integer lapLength, Integer laps, String performingPerson) {
        this.id = id;
        this.activityType = activityType;
        this.title = title;
        this.date = date;
        this.startTime = startTime;
        this.description = description;
        this.activitySubtype = activitySubtype;
        this.terrain = terrain;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.distance = distance;
        this.averageHeartRate = averageHeartRate;
        this.calories = calories;
        this.steps = steps;
        this.averagePace = averagePace;
        this.averageSpeed = averageSpeed;
        this.power = power;
        this.cadence = cadence;
        this.elevationLoss = elevationLoss;
        this.elevationGain = elevationGain;
        this.lapLength = lapLength;
        this.laps = laps;
        this.performingPerson = performingPerson;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivitySubtype() {
        return activitySubtype;
    }

    public void setActivitySubtype(String activitySubtype) {
        this.activitySubtype = activitySubtype;
    }

    public String getTerrain() {
        return terrain;
    }

    public void setTerrain(String terrain) {
        this.terrain = terrain;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }

    public Integer getSeconds() {
        return seconds;
    }

    public void setSeconds(Integer seconds) {
        this.seconds = seconds;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public Integer getAverageHeartRate() {
        return averageHeartRate;
    }

    public void setAverageHeartRate(Integer averageHeartRate) {
        this.averageHeartRate = averageHeartRate;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Integer getSteps() {
        return steps;
    }

    public void setSteps(Integer steps) {
        this.steps = steps;
    }

    public Double getAveragePace() {
        return averagePace;
    }

    public void setAveragePace(Double averagePace) {
        this.averagePace = averagePace;
    }

    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public Integer getCadence() {
        return cadence;
    }

    public void setCadence(Integer cadence) {
        this.cadence = cadence;
    }

    public Integer getElevationLoss() {
        return elevationLoss;
    }

    public void setElevationLoss(Integer elevationLoss) {
        this.elevationLoss = elevationLoss;
    }

    public Integer getElevationGain() {
        return elevationGain;
    }

    public void setElevationGain(Integer elevationGain) {
        this.elevationGain = elevationGain;
    }

    public Integer getLapLength() {
        return lapLength;
    }

    public void setLapLength(Integer lapLength) {
        this.lapLength = lapLength;
    }

    public Integer getLaps() {
        return laps;
    }

    public void setLaps(Integer laps) {
        this.laps = laps;
    }

    public String getPerformingPerson() {
        return performingPerson;
    }

    public void setPerformingPerson(String performingPerson) {
        this.performingPerson = performingPerson;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person, boolean add) {
        this.person = person;
        if (person != null && add) {
            person.addActivity(this, false);
        }
    }

    public void setPerson(Person person) {
        setPerson(person, true);
    }

    public boolean equals(Object object) {
        if (object == this)
            return true;
        if ((object == null) || !(object instanceof Activity))
            return false;

        final Activity activity = (Activity) object;

        if (id != null && activity.getId() != null) {
            return id.equals(activity.getId());
        }
        return false;
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                .append("activityType", activityType)
                .append("title", title)
                .append("date", date)
                .append("startTime", startTime)
                .append("description", description)
                .append("activitySubtype", activitySubtype)
                .append("terrain", terrain)
                .append("hours", hours)
                .append("minutes", minutes)
                .append("seconds", seconds)
                .append("distance", distance)
                .append("averageHeartRate", averageHeartRate)
                .append("calories", calories)
                .append("steps", steps)
                .append("averagePace", averagePace)
                .append("averageSpeed", averageSpeed)
                .append("power", power)
                .append("cadence", cadence)
                .append("elevationLoss", elevationLoss)
                .append("elevationGain", elevationGain)
                .append("lapLength", lapLength)
                .append("laps", laps)
                .append("performingPerson", performingPerson)
                .toString();
    }
}
