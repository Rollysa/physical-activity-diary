package repository;

import model.PasswordResetToken;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends BaseRepository<PasswordResetToken> {

    PasswordResetToken findByToken(String resetToken);
}
