package com.srsco.expenseapp.service;

import com.srsco.expenseapp.domain.Expense;
import com.srsco.expenseapp.repository.ExpenseRepository;
import com.srsco.expenseapp.service.dto.ExpenseDTO;
import com.srsco.expenseapp.service.dto.ExpenseTotalDTO;
import com.srsco.expenseapp.service.mapper.ExpenseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Expense}.
 */
@Service
@Transactional
public class ExpenseService {

    private final Logger log = LoggerFactory.getLogger(ExpenseService.class);

    private final ExpenseRepository expenseRepository;

    private final ExpenseMapper expenseMapper;

    public ExpenseService(ExpenseRepository expenseRepository, ExpenseMapper expenseMapper) {
        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
    }

    /**
     * Save a expense.
     *
     * @param expenseDTO the entity to save.
     * @return the persisted entity.
     */
    public ExpenseDTO save(ExpenseDTO expenseDTO) {
        log.debug("Request to save Expense : {}", expenseDTO);
        Expense expense = expenseMapper.toEntity(expenseDTO);
        expense = expenseRepository.save(expense);
        return expenseMapper.toDto(expense);
    }

    /**
     * Get all the expenses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ExpenseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Expenses");
        return expenseRepository.findAll(pageable)
            .map(expenseMapper::toDto);
    }


    /**
     * Get one expense by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ExpenseDTO> findOne(Long id) {
        log.debug("Request to get Expense : {}", id);
        return expenseRepository.findById(id)
            .map(expenseMapper::toDto);
    }
    
    /**
     * Get one expense by start & end date.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ExpenseTotalDTO> findByDate() {
    	LocalDate endDt = LocalDate.now();
    	endDt =endDt.plusDays(1l);
    	ExpenseTotalDTO expenseTotalOptional = new ExpenseTotalDTO();
    	
    	LocalDate startDt = endDt.minusDays(endDt.getDayOfMonth());
    	
        log.info("Request to get Expense : Start Dt :"+startDt +" End Dt :"+endDt);
        List<Expense> expenseDto = expenseRepository.findByDate(startDt, endDt);
        log.info("Total Expense Record :"+expenseDto.size());
        BigDecimal total = BigDecimal.ZERO;
        String currentMonth= LocalDate.now().getMonth().getDisplayName(TextStyle.FULL, Locale.ENGLISH);
        expenseTotalOptional.setCurrentMonth(currentMonth);
        log.info("Current Month :"+expenseTotalOptional);
        for(Expense ex : expenseDto) {
        	total = total.add(ex.getAmount());
        }
        log.info("Total Expense :"+total);
        expenseTotalOptional.setMonthTotal(total);
        
        Optional<ExpenseTotalDTO> opt = Optional.ofNullable(expenseTotalOptional);
        return opt;
    }

    /**
     * Delete the expense by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Expense : {}", id);
        expenseRepository.deleteById(id);
    }
}
