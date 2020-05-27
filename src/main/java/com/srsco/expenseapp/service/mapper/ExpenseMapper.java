package com.srsco.expenseapp.service.mapper;

import com.srsco.expenseapp.domain.*;
import com.srsco.expenseapp.service.dto.ExpenseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Expense} and its DTO {@link ExpenseDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ExpenseMapper extends EntityMapper<ExpenseDTO, Expense> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ExpenseDTO toDto(Expense expense);

    @Mapping(source = "userId", target = "user")
    Expense toEntity(ExpenseDTO expenseDTO);

    default Expense fromId(Long id) {
        if (id == null) {
            return null;
        }
        Expense expense = new Expense();
        expense.setId(id);
        return expense;
    }
}
