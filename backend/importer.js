const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const importDir = './import';

const parser = new XMLParser();

const xmlFiles = fs.readdirSync(importDir)
                     .filter(file => file.endsWith('.xml'));

xmlFiles.forEach(file => {
    let data = fs.readFileSync(`${importDir}/${file}`, 'utf-8');
    let jsonObj = parser.parse(data).Return;

    let betterJsonObj = {
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
            betterJsonObj.contributions = jsonObj.ReturnData.IRS990PF.SupplementaryInformationGrp.GrantOrContributionPdDurYrGrp
            // RecipientFoundationStatusTxt, GrantOrContributionPurposeTxt, Amt
            break;
        default:
      }
    console.log(betterJsonObj);
})
