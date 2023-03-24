import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from 'src/services/exchange-rate.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExchangeResult } from '../interfaces/currency.interface';
import { currencySymbolsArray } from 'src/services/currency-symbols.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  constructor(
    private exchangeRateService:ExchangeRateService,
    private formBuilder: FormBuilder
  ) {}

  currencySymbols: string[][] = currencySymbolsArray
  currencyForm!: FormGroup
  exchangeResult$!: Observable<ExchangeResult>
  areCurrenciesReversed:boolean = false

  ngOnInit(): void {

    this.currencyForm = this.formBuilder.group({
      currencyA: ['AED', Validators.required],
      currencyB: ['AED', Validators.required],
      value: ['', [Validators.required, Validators.min(0), this.onlyNumbers]]
    });
    
    
  }

  onlyNumbers(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/^\d+(\.\d+)?$/.test(value)) {
      return { onlyNumbers: true };
    }
    return null;
  }

  onSubmitCurrencyForm():void {
    this.exchangeResult$ = this.exchangeRateService.getCurrencyConversion(this.currencyForm.value, this.areCurrenciesReversed)
  }

  onReverseCurrencies():void {
    this.areCurrenciesReversed = !this.areCurrenciesReversed
  }

}
