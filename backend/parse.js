import fs from 'fs';
import send from './send.js';
import { XMLParser } from 'fast-xml-parser';

const parseDir = './parse';

const parser = new XMLParser();

const xmlFiles = fs.readdirSync(parseDir)
                    .filter(file => file.endsWith('.xml'));

let betterJsonObjects = [];

xmlFiles.forEach(file => {
    let data = fs.readFileSync(`${parseDir}/${file}`, 'utf-8');
    let jsonObj = parser.parse(data).Return;

    let betterJsonObj = {
        ein: jsonObj.ReturnHeader.PreparerFirmGrp.PreparerFirmEIN,
        returnType: String(jsonObj.ReturnHeader.ReturnTypeCd),
        city: jsonObj.ReturnHeader.PreparerFirmGrp.PreparerUSAddress.CityNm,
        state: jsonObj.ReturnHeader.PreparerFirmGrp.PreparerUSAddress.StateAbbreviationCd
    };

    switch(betterJsonObj.returnType) {
        case "990":
            betterJsonObj.grossRevenue = jsonObj.ReturnData.IRS990.CYTotalRevenueAmt;
            betterJsonObj.netRevenue = jsonObj.ReturnData.IRS990.CYRevenuesLessExpensesAmt
            betterJsonObj.employees = jsonObj.ReturnData.IRS990.Form990PartVIISectionAGrp
            break;
        case "990EZ":
            betterJsonObj.grossRevenue = jsonObj.ReturnData.IRS990EZ.TotalRevenueAmt
            //betterJsonObj.grossRevenue = jsonObj.ReturnData.IRS990EZ.AnalysisOfRevenueAndExpenses.TotalExpensesRevAndExpnssAmt;
            betterJsonObj.netRevenue = jsonObj.ReturnData.IRS990EZ.ExcessOrDeficitForYearAmt
            //betterJsonObj.netRevenue = jsonObj.ReturnData.IRS990EZ.AnalysisOfRevenueAndExpenses.NetInvestmentIncomeAmt;
            betterJsonObj.employees = jsonObj.ReturnData.IRS990EZ.OfficerDirectorTrusteeEmplGrp;
            break;
        case "990PF":
            betterJsonObj.onlyContributeToPreselected = jsonObj.ReturnData.IRS990PF.SupplementaryInformationGrp.OnlyContriToPreselectedInd
            // includes RecipientFoundationStatusTxt, GrantOrContributionPurposeTxt, Amt
            betterJsonObj.contributions = jsonObj.ReturnData.IRS990PF.SupplementaryInformationGrp.GrantOrContributionPdDurYrGrp
            betterJsonObj.employees = [];
            break;
        default:
    }

    //Filter out employees with titles that aren't used in search terms
    betterJsonObj.employees = betterJsonObj.employees.filter(o => {
        let title = o.TitleTxt.toLowerCase();
        return title.includes("director") ||
                (title.includes("chief") && title.includes("officer")) ||
                title.includes("manager") ||
                title.includes("coordinator") ||
                title.includes("assistant")
    });
    betterJsonObjects.push(betterJsonObj);
})

send(betterJsonObjects);
