import {HomePage} from "../src/components/homePage/HomePage";
import {destination_data, source_data, webhook_data} from "../utils/inputData";

describe('Verify connection exist between source and destination',function () {
    let hompageObj = new HomePage();
    const expectedMessageRegex = 'Now view Live Events'


    it('User should check if connection doesn’t exist then connect source to destination', async function () {
        let connectObj =  await hompageObj.goToConnectionPage();
        let getSrList = await connectObj.getCountOfSrc()
        if(getSrList == 0){
            let srcPgObj = await connectObj.clickAddSource();
            await srcPgObj.AddNewSource(source_data.source, source_data.source_name)
            await hompageObj.goToConnectionPage();
            let destinationPgObj = await connectObj.clickAddDestination();
            await destinationPgObj.AddNewDestination(destination_data.destination, destination_data.destination_name, source_data.source_name)
            await destinationPgObj.createWebhookDestination(webhook_data.url)
            let message = await destinationPgObj.getDestinationMsg();
            console.log("Pop up message : "+ message)
            await expect(message).toContain(expectedMessageRegex);
        } else{
            console.log("Connection already exist")
        }
    })

    it('Read the count of delivered and failed events on events tab of webhook destination', async function () {
        let destinationObj =  await hompageObj.goToDestinationPage();
        await destinationObj.clickDetailsLink();
        await destinationObj.goToEventTab();
        let eventDeliveredText = await destinationObj.getEventDeliveredText();
        let eventFailedText = await destinationObj.getEventFailedText();
        console.log("count of delivered event : "+ eventDeliveredText.replace("\n", " "))
        console.log("count of failed event : "+ eventFailedText.replace("\n", " "))
    })
})