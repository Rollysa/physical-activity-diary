package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.core.style.ToStringCreator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import type.GenderType;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "person", uniqueConstraints = @UniqueConstraint(name = "uk_person_email", columnNames = "email"))
public class Person extends BaseEntity<Long> implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "Please use up to 30 characters")
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Please use up to 30 characters")
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Size(max = 50, message = "Please use up to 50 characters")
    @Column(name = "email", nullable = false)
    private String email;

    @Size(max = 100)
    @Column(name = "password")
    private String password;

    @Transient
    private String confirmPassword;

    @NotNull(message = "Age is required")
    @Min(value = 1, message = "Age should not be less than 1")
    @Max(value = 150, message = "Age should not be greater than 150")
    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "height")
    private Double height;

    @NotNull(message = "Weight is required when calculating calories")
    @Column(name = "weight", nullable = false)
    private Double weight;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private GenderType gender;

    @Min(value = 30, message = "Resting heart rate should not be less than 30")
    @Max(value = 110, message = "Resting heart rate should not be greater than 120")
    @Column(name = "resting_heart_rate")
    private Integer restingHeartRate;

    @Column(name = "body_fat")
    private Integer bodyFat;

    @OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
    private PasswordResetToken passwordResetToken;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "person", orphanRemoval = true)
    @OrderBy("date DESC")
    private List<Activity> activities = new ArrayList<>();

    public Person() {
    }

    public Person(Long id, @NotBlank(message = "First name is required") @Size(max = 50, message = "Please use up to 30 characters") String firstName, @NotBlank(message = "Last name is required") @Size(max = 50, message = "Please use up to 30 characters") String lastName, @NotBlank(message = "Email is required") @Size(max = 50, message = "Please use up to 50 characters") String email, @Size(max = 100) String password, String confirmPassword, @NotNull(message = "Age is required") @Min(value = 1, message = "Age should not be less than 1") @Max(value = 150, message = "Age should not be greater than 150") Integer age, Double height, @NotNull(message = "Weight is required when calculating calories") Double weight, GenderType gender, @Min(value = 30, message = "Resting heart rate should not be less than 30") @Max(value = 110, message = "Resting heart rate should not be greater than 120") Integer restingHeartRate, Integer bodyFat) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.age = age;
        this.height = height;
        this.weight = weight;
        this.gender = gender;
        this.restingHeartRate = restingHeartRate;
        this.bodyFat = bodyFat;
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public GenderType getGender() {
        return gender;
    }

    public void setGender(GenderType gender) {
        this.gender = gender;
    }

    public Integer getRestingHeartRate() {
        return restingHeartRate;
    }

    public void setRestingHeartRate(Integer restingHeartRate) {
        this.restingHeartRate = restingHeartRate;
    }

    public Integer getBodyFat() {
        return bodyFat;
    }

    public void setBodyFat(Integer bodyFat) {
        this.bodyFat = bodyFat;
    }

    public List<Activity> getActivities() {
        return new ArrayList<Activity>(activities);
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public PasswordResetToken getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(PasswordResetToken passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    // addActivity convenience methods for bi-directional relationship
    public void addActivity(Activity activity) {
        addActivity(activity, true);
    }

    void addActivity(Activity activity, boolean set) {
        if (activity != null) {
            if (getActivities().contains(activity)) {
                getActivities().set(getActivities().indexOf(activity), activity);
            } else {
                getActivities().add(activity);
            }
            if (set) {
                activity.setPerson(this, false);
            }
        }
    }

    public boolean equals(Object object) {
        if (object == this)
            return true;
        if ((object == null) || !(object instanceof Person))
            return false;

        final Person person = (Person) object;

        if (id != null && person.getId() != null) {
            return id.equals(person.getId());
        }
        return false;
    }

    @Override
    public String toString() {
        return new ToStringCreator(this)
                .append("firstName", firstName)
                .append("lastName", lastName)
                .append("email", email)
                .append("password", password)
                .append("age", age)
                .append("height", height)
                .append("weight", weight)
                .append("gender", gender)
                .append("restingHeartRate", restingHeartRate)
                .append("bodyFat", bodyFat)
                .toString();
    }

    /**
     * UserDetails interface methods
     */

    @Override
    @JsonIgnore
    public String getUsername() {
        return null;
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
