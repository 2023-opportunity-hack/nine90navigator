import fs from 'fs';
import send from './send.js';
import { XMLParser } from 'fast-xml-parser';

const parseDir = './parse';

const parser = new XMLParser();

const xmlFiles = fs.readdirSync(parseDir)
                    .filter(file => file.endsWith('.xml'));

let filteredJsonTaxForm = [];

xmlFiles.forEach(file => {
    let data = fs.readFileSync(`${parseDir}/${file}`, 'utf-8');
    let jsonTaxForm = parser.parse(data).Return;

    let filteredJsonTaxForm = {
        ein: String(jsonTaxForm.ReturnHeader.PreparerFirmGrp.PreparerFirmEIN),
        returnType: String(jsonTaxForm.ReturnHeader.ReturnTypeCd),
        city: jsonTaxForm.ReturnHeader.PreparerFirmGrp.PreparerUSAddress.CityNm,
        state: jsonTaxForm.ReturnHeader.PreparerFirmGrp.PreparerUSAddress.StateAbbreviationCd
    };

    switch(filteredJsonTaxForm.returnType) {
        case "990":
            filteredJsonTaxForm.grossRevenue = jsonTaxForm.ReturnData.IRS990.CYTotalRevenueAmt;
            filteredJsonTaxForm.netRevenue = jsonTaxForm.ReturnData.IRS990.CYRevenuesLessExpensesAmt
            filteredJsonTaxForm.employees = jsonTaxForm.ReturnData.IRS990.Form990PartVIISectionAGrp
            break;
        case "990EZ":
            filteredJsonTaxForm.grossRevenue = jsonTaxForm.ReturnData.IRS990EZ.TotalRevenueAmt
            //filteredJsonTaxForm.grossRevenue = jsonTaxForm.ReturnData.IRS990EZ.AnalysisOfRevenueAndExpenses.TotalExpensesRevAndExpnssAmt;
            filteredJsonTaxForm.netRevenue = jsonTaxForm.ReturnData.IRS990EZ.ExcessOrDeficitForYearAmt
            //filteredJsonTaxForm.netRevenue = jsonTaxForm.ReturnData.IRS990EZ.AnalysisOfRevenueAndExpenses.NetInvestmentIncomeAmt;
            filteredJsonTaxForm.employees = jsonTaxForm.ReturnData.IRS990EZ.OfficerDirectorTrusteeEmplGrp;
            break;
        case "990PF":
            filteredJsonTaxForm.onlyContributeToPreselected = jsonTaxForm.ReturnData.IRS990PF.SupplementaryInformationGrp.OnlyContriToPreselectedInd
            // includes RecipientFoundationStatusTxt, GrantOrContributionPurposeTxt, Amt
            filteredJsonTaxForm.contributions = jsonTaxForm.ReturnData.IRS990PF.SupplementaryInformationGrp.GrantOrContributionPdDurYrGrp
            filteredJsonTaxForm.employees = [];
            break;
        default:
    }

    //Filter out employees with titles that aren't used in search terms
    filteredJsonTaxForm.employees = filteredJsonTaxForm.employees.filter(o => {
        let title = o.TitleTxt.toLowerCase();
        return title.includes("director") ||
                (title.includes("chief") && title.includes("officer")) ||
                title.includes("manager") ||
                title.includes("coordinator") ||
                title.includes("assistant")
    });
    filteredJsonTaxForm.push(filteredJsonTaxForm);
})
if(filteredJsonTaxForm.returnType === '990' ||
filteredJsonTaxForm.returnType === '990EZ' || 
filteredJsonTaxForm.returnType === '990PF'){
    send(filteredJsonTaxForm);
}
