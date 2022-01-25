// import { Component, OnInit, ViewChild } from "@angular/core";
// import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
// import { Router } from "@angular/router";
// import { TabsetComponent } from "ngx-bootstrap/tabs";
// import { IPropertyBase } from "src/app/model/IPropertyBase";


// @Component({
//   selector: 'add-property-card',
//   templateUrl: 'add-property.component.html',
//   styleUrls: ['add-property.component.css']
// }

// )
// export class AddPropertyComponent implements OnInit {
// //@ViewChild('Form') addPropertyForm : NgForm;
// //to used reactive form validation in ts file
// addPropertyForm: FormGroup;
// @ViewChild('formTabs') formTabs?: TabsetComponent;

// //These will come from database
// propertyType = ['House','Apartment','Duplex']
// furnishType = ['Fully','Semi','Unfurnished']
// readyToMove = ['East', 'West', 'South', 'North']
// gatedCommunity = ['Yes','No']

// propertyView:IPropertyBase = {
//   Id:null,
//   Name: '',
//   Price: null,
//   SellRent: null,
//   PType: '',
//   FType: '',
//   BHK: null,
//   City: '',
//   BuiltArea: null,
//   RTM: null
// };

// //to create reactive form in ts we have to pass formbuilder in
// // constructor and then have to create and validatior function to validate form controls
// constructor (private router: Router, private fb: FormBuilder){}
// ngOnInit(): void {
//   this.CreateAddPropertyForm();
// }

// CreateAddPropertyForm(){
//   this.addPropertyForm = this.fb.group({
//     SellRent: [null, Validators.required],
//     PType: [null, Validators.required],
//     Name: [null, Validators.required],
//     Price: [null, Validators.required],
//     BuiltArea: [null, Validators.required]
//   })
// }

// onBack(){
//   this.router.navigate(['/']);
// }

// onSubmit(){
//  // onSubmit(Form: NgForm){
//  console.log(this.addPropertyForm.value.SellRent);
// }

// selectTab(tabId: number) {
//   if (this.formTabs?.tabs[tabId]) {
//     this.formTabs.tabs[tabId].active = true;
//   }
// }
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/IPropertyBase';
//import { DatePipe } from '@angular/common';
import { HousingService } from 'src/app/service/housing.service';
import { AlertifyService } from 'src/app/service/alertify.service';
import { Property } from 'src/app/model/Property';

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
    // @ViewChild('Form') addPropertyForm: NgForm;
    @ViewChild('formTabs') formTabs: TabsetComponent;
    addPropertyForm: FormGroup;
    nextClicked: boolean;
    property = new Property();

    // Will come from masters

    propertyTypes = ['House','Apartment','Duplex']
    furnishTypes = ['Fully','Semi','Unfurnished']
    bhkTypes = [1,2,3,4]
    //propertyTypes: ['House','Flat', 'Shop'];//Ikeyvaluepair[];
    //furnishTypes: ['Not Furnished','Semi-Furnished', 'Fully-Furnished'];//Ikeyvaluepair[];
    //cityList: any[];
    cityList= [{id:1, name:'karachi'},{id:2, name:'Hyderabad'},{id:3, name:'Lahore'},{id:4, name:'Faislabad'}];
    propertyView: IPropertyBase = {
        id: null,
        name: '',
        price: null,
        sellRent: null,
        propertyType: null,
        furnishingType: null,
        bhk: null,
        builtArea: null,
        city: '',
        readyToMove: null
    };

    constructor(
        //private datePipe: DatePipe,
        private fb: FormBuilder,
        private router: Router,
        private housingService: HousingService,
        private alertify: AlertifyService) { }

    ngOnInit() {
        // if(!localStorage.getItem('userName'))
        // {
        //     this.alertify.error('You must be logged in to add a property');
        //     this.router.navigate(['/user/login']);
        // }

        this.CreateAddPropertyForm();
        // this.housingService.getAllCities().subscribe(data => {
        //     this.cityList = data;
        //     console.log(data);
        // });

        // this.housingService.getPropertyTypes().subscribe(data => {
        //     this.propertyTypes = data;
        // });

        // this.housingService.getFurnishingTypes().subscribe(data => {
        //     this.furnishTypes = data;
        // });

    }

    CreateAddPropertyForm() {
        this.addPropertyForm = this.fb.group({
            BasicInfo: this.fb.group({
                SellRent: ['1' , Validators.required],
                BHK: [null, Validators.required],
                PType: [null, Validators.required],
                FType: [null, Validators.required],
                Name: [null, Validators.required],
                City: [null, Validators.required]
            }),

            PriceInfo: this.fb.group({
                Price: [null, Validators.required],
                BuiltArea: [null, Validators.required],
                CarpetArea: [null],
                Security: [0],
                Maintenance: [0],
            }),

            AddressInfo: this.fb.group({
                FloorNo: [null],
                TotalFloor: [null],
                Address: [null, Validators.required],
                LandMark: [null],
            }),

            OtherInfo: this.fb.group({
                RTM: [null, Validators.required],
                PossessionOn: [null, Validators.required],
                AOP: [null],
                Gated: [null],
                MainEntrance: [null],
                Description: [null]
            })
        });
    }

    // #region <Getter Methods>
    // #region <FormGroups>
    get BasicInfo() {
        return this.addPropertyForm.get('BasicInfo') as FormGroup;
    }

    get PriceInfo() {
        return this.addPropertyForm.get('PriceInfo') as FormGroup;
    }

    get AddressInfo() {
        return this.addPropertyForm.get('AddressInfo') as FormGroup;
    }

    get OtherInfo() {
        return this.addPropertyForm.get('OtherInfo') as FormGroup;
    }
    // #endregion

    // #region <Form Controls>
    get SellRent() {
        return this.BasicInfo.get('SellRent') as FormControl;
    }

    get BHK() {
        return this.BasicInfo.get('BHK') as FormControl;
    }

    get PType() {
        return this.BasicInfo.get('PType') as FormControl;
    }

    get FType() {
        return this.BasicInfo.get('FType') as FormControl;
    }

    get Name() {
        return this.BasicInfo.get('Name') as FormControl;
    }

    get City() {
        return this.BasicInfo.get('City') as FormControl;
    }

    get Price() {
        return this.PriceInfo.get('Price') as FormControl;
    }

    get BuiltArea() {
        return this.PriceInfo.get('BuiltArea') as FormControl;
    }

    get CarpetArea() {
        return this.PriceInfo.get('CarpetArea') as FormControl;
    }

    get Security() {
        return this.PriceInfo.get('Security') as FormControl;
    }

    get Maintenance() {
        return this.PriceInfo.get('Maintenance') as FormControl;
    }

    get FloorNo() {
        return this.AddressInfo.get('FloorNo') as FormControl;
    }

    get TotalFloor() {
        return this.AddressInfo.get('TotalFloor') as FormControl;
    }

    get Address() {
        return this.AddressInfo.get('Address') as FormControl;
    }

    get LandMark() {
        return this.AddressInfo.get('LandMark') as FormControl;
    }

    get RTM() {
        return this.OtherInfo.get('RTM') as FormControl;
    }

    get PossessionOn() {
        return this.OtherInfo.get('PossessionOn') as FormControl;
    }

    get AOP() {
        return this.OtherInfo.get('AOP') as FormControl;
    }

    get Gated() {
        return this.OtherInfo.get('Gated') as FormControl;
    }

    get MainEntrance() {
        return this.OtherInfo.get('MainEntrance') as FormControl;
    }

    get Description() {
        return this.OtherInfo.get('Description') as FormControl;
    }

    // #endregion
    // #endregion

    onBack() {
        this.router.navigate(['/']);
    }

    onSubmit() {
        this.nextClicked = true;
        if (this.allTabsValid()) {
            this.mapProperty();
            //this.housingService.addProperty(this.property).subscribe(
            //    () => {
            this.housingService.addProperty(this.property);
            this.alertify.success('Congrats, your property listed successfully on our website');
            console.log(this.addPropertyForm);

            if (this.SellRent.value === '2') {
                this.router.navigate(['/rent-property']);
            } else {
                this.router.navigate(['/']);
            }
           //     }
           //  );

        } else {
            this.alertify.error('Please review the form and provide all valid entries');
        }
    }

    mapProperty(): void {
        //this.property.id = this.housingService.newPropID();
        this.property.sellRent = +this.SellRent.value;
        this.property.bhk = this.BHK.value;
        this.property.propertyTypeId = this.PType.value;
        this.property.name = this.Name.value;
        this.property.CityId = this.City.value;
        this.property.furnishingTypeId = this.FType.value;
        this.property.price = this.Price.value;
        this.property.security = this.Security.value;
        this.property.maintenance = this.Maintenance.value;
        this.property.builtArea = this.BuiltArea.value;
        this.property.carpetArea = this.CarpetArea.value;
        this.property.floorNo = this.FloorNo.value;
        this.property.totalFloors = this.TotalFloor.value;
        this.property.address = this.Address.value;
        this.property.address2 = this.LandMark.value;
        this.property.readyToMove = this.RTM.value;
        this.property.gated = this.Gated.value;
        this.property.mainEntrance = this.MainEntrance.value;
        //this.property.estPossessionOn = this.datePipe.transform(this.PossessionOn.value,'MM/dd/yyyy')!;
        this.property.description = this.Description?.value;
    }

    allTabsValid(): boolean {
        if (this.BasicInfo.invalid) {
            this.formTabs.tabs[0].active = true;
            return false;
        }

        if (this.PriceInfo.invalid) {
            this.formTabs.tabs[1].active = true;
            return false;
        }

        if (this.AddressInfo.invalid) {
            this.formTabs.tabs[2].active = true;
            return false;
        }

        if (this.OtherInfo.invalid) {
            this.formTabs.tabs[3].active = true;
            return false;
        }
        return true;
    }

    selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
        this.nextClicked = true;
        if (IsCurrentTabValid) {
            this.formTabs.tabs[NextTabId].active = true;
        }
    }

}
