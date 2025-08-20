import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CTestPage } from "./test.page";

let routes = RouterModule.forChild ([        
    {path: "", component: CTestPage},    
]);

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        routes,
    ],
    declarations: [
        CTestPage,
    ],
    exports: [
        CTestPage,
    ],    
})
export class CTestModule {}
