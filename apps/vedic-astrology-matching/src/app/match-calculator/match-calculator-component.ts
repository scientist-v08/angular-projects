import {
  afterNextRender,
  AfterViewChecked,
  Component,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { SelectBoxComponent } from '../components/select-box-component';
import {
  allPadas,
  allRashis,
  RashiNakshatraInterface,
} from '../data/all-rashi';
import { allNakshtraMappedToRashi } from '../data/rashi-nakshatra-mapping';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, startWith, Subject, takeUntil } from 'rxjs';
import { CompatibilityCardComponent } from '../components/compatibility-card-component';
import { KutaIterator } from '../interfaces/kutaIterator-interface';
import { allKutaIterator } from '../data/kuta-iterator-data';
import { RashiInfo } from '../interfaces/rashi-info-interface';
import { rashis } from '../data/raashi-info-chart';
import { NakshatraInfo } from '../interfaces/nakshatra-info-interface';
import { nakshatraInfo } from '../data/nakshatra-info';
import { VarnaVashyaCalculatorService } from '../services/varna-vashya-calculator-service';
import { TaraBhakutaCalculatorService } from '../services/tara-bhakuta-calculator-service';
import { YoniMaitriGanaNadiCalculatorService } from '../services/yoni-maitri-gana-nadi-calculator-service';
import { RajjuDoshaService } from '../services/rajju-dosha-service';

@Component({
  standalone: true,
  imports: [
    SelectBoxComponent,
    ReactiveFormsModule,
    CompatibilityCardComponent,
  ],
  selector: 'app-match-selector',
  templateUrl: './match-calculator-component.html',
  providers: [
    VarnaVashyaCalculatorService,
    TaraBhakutaCalculatorService,
    YoniMaitriGanaNadiCalculatorService,
    RajjuDoshaService,
  ],
})
export class MatchCalculatorComponent
  implements OnInit, AfterViewChecked, OnDestroy
{
  private varnaVashyaCalculator = inject(VarnaVashyaCalculatorService);
  private taraBhakutaCalculator = inject(TaraBhakutaCalculatorService);
  private yoniMaitriGanaNadiCalculatorService = inject(
    YoniMaitriGanaNadiCalculatorService
  );
  private rajjuDoshaService = inject(RajjuDoshaService);
  private fb = inject(FormBuilder);
  astrologyForm: FormGroup = this.fb.group({
    brideRaashi: ['', Validators.required],
    brideNakshatra: ['', Validators.required],
    bridePada: [''],
    groomRaashi: ['', Validators.required],
    groomNakshatra: ['', Validators.required],
    groomPada: [''],
  });
  unsubscribe$ = new Subject<void>();
  allRashisDropDown = allRashis;
  allNakshatrasDropDown = allNakshtraMappedToRashi;
  brideNakshatras = signal<RashiNakshatraInterface[]>([]);
  groomNakshatras = signal<RashiNakshatraInterface[]>([]);
  brideAllPadas = allPadas;
  groomAllPadas = allPadas;
  showBridePadas = signal<boolean>(false);
  showGroomPadas = signal<boolean>(false);
  kutaIterator = signal<KutaIterator[]>(allKutaIterator);
  allRashiInfo = signal<RashiInfo[]>(rashis);
  allNakshatraInfo = signal<NakshatraInfo[]>(nakshatraInfo);
  brideRaashiInfo: RashiInfo | null = null;
  groomRaashiInfo: RashiInfo | null = null;
  groomNakshatraInfo: NakshatraInfo | null = null;
  brideNakshatraInfo: NakshatraInfo | null = null;
  firstScore: KutaIterator | null = null;
  secondScore: KutaIterator | null = null;
  thirdScore: KutaIterator | null = null;
  fourScore: KutaIterator | null = null;
  fiveScore: KutaIterator | null = null;
  sixScore: KutaIterator | null = null;
  seventhScore: KutaIterator | null = null;
  eighthScore: KutaIterator | null = null;
  ninthScore: KutaIterator | null = null;
  nadiDosha = signal<boolean>(false);
  showCards = signal<boolean>(false);
  divEl = viewChild<ElementRef>('scroll');
  shouldScroll = signal<boolean>(false);

  ngOnInit(): void {
    this.trackBrideRaashiChanges();
    this.trackBrideNakshatraChanges();
    this.trackGroomRaashiChanges();
    this.trackGroomNakshatraChanges();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll() && this.divEl()) {
      this.divEl()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      this.shouldScroll.set(false);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setShowCards(): void {
    this.showCards.set(false);
  }

  trackBrideRaashiChanges(): void {
    this.astrologyForm.controls['brideRaashi'].valueChanges
      .pipe(
        startWith(this.astrologyForm.controls['brideRaashi'].value),
        filter((val) => val !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val) => {
        this.brideNakshatras.set(
          this.allNakshatrasDropDown[val - 1]?.nakshatras
        );
        this.setShowCards();
        this.astrologyForm.controls['brideNakshatra'].setValue('');
      });
  }

  trackGroomRaashiChanges(): void {
    this.astrologyForm.controls['groomRaashi'].valueChanges
      .pipe(
        startWith(this.astrologyForm.controls['groomRaashi'].value),
        filter((val) => val !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val) => {
        this.groomNakshatras.set(
          this.allNakshatrasDropDown[val - 1]?.nakshatras
        );
        this.setShowCards();
        this.astrologyForm.controls['groomNakshatra'].setValue('');
      });
  }

  trackBrideNakshatraChanges(): void {
    this.astrologyForm.controls['brideNakshatra'].valueChanges
      .pipe(
        startWith(this.astrologyForm.controls['brideNakshatra'].value),
        filter((val) => val !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val) => {
        if (val === '22') {
          this.showBridePadas.set(true);
          this.astrologyForm.controls['bridePada'].setValidators(
            Validators.required
          );
          this.astrologyForm.controls['bridePada'].updateValueAndValidity();
        } else {
          this.showBridePadas.set(false);
          this.astrologyForm.controls['bridePada'].removeValidators(
            Validators.required
          );
          this.astrologyForm.controls['bridePada'].updateValueAndValidity();
        }
        this.setShowCards();
      });
  }

  trackGroomNakshatraChanges(): void {
    this.astrologyForm.controls['groomNakshatra'].valueChanges
      .pipe(
        startWith(this.astrologyForm.controls['groomNakshatra'].value),
        filter((val) => val !== ''),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val) => {
        if (val === '22') {
          this.showGroomPadas.set(true);
          this.astrologyForm.controls['groomPada'].setValidators(
            Validators.required
          );
          this.astrologyForm.controls['groomPada'].updateValueAndValidity();
        } else {
          this.showGroomPadas.set(false);
          this.astrologyForm.controls['groomPada'].removeValidators(
            Validators.required
          );
          this.astrologyForm.controls['groomPada'].updateValueAndValidity();
        }
        this.setShowCards();
      });
  }

  checkMatching(): void {
    const {
      brideRaashi,
      brideNakshatra,
      bridePada,
      groomRaashi,
      groomNakshatra,
      groomPada,
    } = this.astrologyForm.getRawValue();
    const brideRaashiInfo = this.allRashiInfo()[brideRaashi - 1];
    const brideNakshatraInfo = this.allNakshatraInfo()[brideNakshatra - 1];
    const groomRaashiInfo = this.allRashiInfo()[groomRaashi - 1];
    const groomNakshatraInfo = this.allNakshatraInfo()[groomNakshatra - 1];
    const sameRaashiRulerException =
      brideRaashiInfo.ruler === groomRaashiInfo.ruler;
    this.firstScore = this.varnaVashyaCalculator.varnaCalculator(
      groomRaashiInfo,
      brideRaashiInfo
    );
    this.secondScore = this.varnaVashyaCalculator.vashyaCalculator(
      groomRaashiInfo,
      brideRaashiInfo,
      groomNakshatra,
      brideNakshatra,
      groomPada,
      bridePada
    );
    this.thirdScore = this.taraBhakutaCalculator.taraCalculator(
      groomNakshatraInfo,
      brideNakshatraInfo
    );
    this.fourScore = this.yoniMaitriGanaNadiCalculatorService.yoniCalculator(
      groomNakshatraInfo,
      brideNakshatraInfo
    );
    this.fiveScore = this.yoniMaitriGanaNadiCalculatorService.maitriCalculator(
      groomRaashiInfo,
      brideRaashiInfo
    );
    this.sixScore = this.yoniMaitriGanaNadiCalculatorService.ganaCalculator(
      groomNakshatraInfo,
      brideNakshatraInfo,
      sameRaashiRulerException
    );
    this.seventhScore = this.taraBhakutaCalculator.bhakutaCalculator(
      groomRaashiInfo,
      brideRaashiInfo,
      sameRaashiRulerException
    );
    this.eighthScore = this.yoniMaitriGanaNadiCalculatorService.nadiCalculator(
      groomNakshatraInfo,
      brideNakshatraInfo
    );
    if (this.eighthScore.score === 0) {
      this.nadiDosha.set(true);
    } else {
      this.nadiDosha.set(false);
    }
    const totalScore =
      this.firstScore.score +
      this.secondScore.score +
      this.thirdScore.score +
      this.fourScore.score +
      this.fiveScore.score +
      this.sixScore.score +
      this.seventhScore.score +
      this.eighthScore.score;
    const rajjuComments = this.rajjuDoshaService.rajjuCalculator(
      groomNakshatraInfo,
      brideNakshatraInfo,
      sameRaashiRulerException
    );
    const ninthComment = this.nadiDosha()
      ? `If possible please avoid this union due to nadi dosha. ${rajjuComments}`
      : `No nadi dosha. ${rajjuComments}`;
    this.ninthScore = {
      index: 8,
      score: totalScore,
      comments: ninthComment,
    };
    this.kutaIterator.set([
      this.firstScore,
      this.secondScore,
      this.thirdScore,
      this.fourScore,
      this.fiveScore,
      this.sixScore,
      this.seventhScore,
      this.eighthScore,
      this.ninthScore,
    ]);
    this.showCards.set(true);
    this.shouldScroll.set(true);
  }
}
