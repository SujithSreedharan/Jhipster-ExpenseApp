package com.srsco.expenseapp.service.dto;

import java.math.BigDecimal;

public class ExpenseTotalDTO {

	BigDecimal monthTotal = BigDecimal.ZERO;
	String currentMonth;
	
	public BigDecimal getMonthTotal() {
		return monthTotal;
	}
	public void setMonthTotal(BigDecimal monthTotal) {
		this.monthTotal = monthTotal;
	}
	public String getCurrentMonth() {
		return currentMonth;
	}
	public void setCurrentMonth(String currentMonth) {
		this.currentMonth = currentMonth;
	}
}
