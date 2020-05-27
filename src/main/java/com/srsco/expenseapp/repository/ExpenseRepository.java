package com.srsco.expenseapp.repository;
import com.srsco.expenseapp.domain.Expense;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Expense entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("select expense from Expense expense where expense.user.login = ?#{principal.username}")
    List<Expense> findByUserIsCurrentUser();

    @Query("select expense from Expense expense where expense.date between ?1 and ?2")
    List<Expense> findByDate(LocalDate startDate, LocalDate endDate);
}
