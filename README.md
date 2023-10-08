![9-90TWO](https://github.com/2023-opportunity-hack/BARRETT-BADDIES---990DataFinder-ATooltoAnalyzeNonprofitsandFoundations-TaxReturns/assets/102429804/9b5d2c16-6fa0-461a-9bfd-20c7577e2dbb)

# Nine-90 Scraper 

***Nine-90*** allows the user to search through data from 990 tax returns of nonprofits around the nation with different search options including geographic location, grant application process, the grant application recipient, submission deadlines, restrictions and limitations, and whether or not the foundation accepts unsolicited requests for funds. Apart from this, ***Nine-90*** can also search through data on nonprofit salaries with search options of geographic locations, annual gross revenue, annual net revenue, and employee title, such as those including keywords like director and chief, ***making it easier for Legends Animated to succeed in sprouting talents.***
# Features
1. Process XML data into a database for speedy access and convience.
2. Fast data and retreval methods.
3. Data visualization and simple gui!
# Why This Tool Was Made
![image](https://github.com/2023-opportunity-hack/BARRETT-BADDIES---990DataFinder-ATooltoAnalyzeNonprofitsandFoundations-TaxReturns/assets/102429804/2337a24f-1ee8-4cd2-a6d5-4db97afe9883)
- This project was created for [Opportunity Hack 2023](https://hack.ohack.dev) hosted at Arizona State University.
- **Legends Animated** is a non-profit organization with a mission of promoting _“the awareness and appreciation of animation as a medium for all forms of storytelling.”_
-Inspired by the ***guerrilla filmmaking movement***, Legends Animated truly helps provide underrepresented, independent animators with a platform to share and develop their stories.
- Being able to **search and sort specific data** from the tax return forms of nonprofits around the nation would help them find the right financial partners, ensuring that their apprentices and employees are always fairly compensated for their efforts.
- For more information, see our [problem statement](https://ohack.dev/project/xsnjfdchdZNjGThFjJPh).

# What tools were used?

|  Software  | Purpose | 
| ------------- | ------------- |
|  [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)| Convert the xml to .json object |
|  Svelte | Front end and back end  |
| Elasticsearch | Database container |
| Leaflet | Map and display |

 Our program was built through three stages: scraping the information from the 990 tax return forms, applying Elasticsearch using Svelte as our framework, and designing the front-end code for the user interface. The program also uses Leaflet to implement the geographical location requirements of the problem.

# Structure
![Screenshot 2023-10-08 at 9 02 50 AM jpeg](https://github.com/2023-opportunity-hack/BARRETT-BADDIES---990DataFinder-ATooltoAnalyzeNonprofitsandFoundations-TaxReturns/assets/102429804/ff5a2d8b-780f-4ff1-a865-f7d5ed64dd5e)



# Challenges
1. While Nine-90’s main function is to search through and interpret the IRS data, it was quite difficult to interpret the XML data, which also had a corrupted zip file. Our plan for the API was discarded after a few hours of work due to a lack of necessary data.
2. On the front-end side of our project, working with and integrating Elasticsearch into Svelte was a big challenge, as our team had little to no prior experience working with the engine.
3. In addition to the integration of Elasticsearch and Svelte, our team had a lot of trouble getting the search bar (a primary feature) to work.

# Acomplishments 
After finally finishing this project, we are extremely proud of all of our technical accomplishments and everything we have learned through this experience! Over the course of the past couple of days, we used multiple APIs, integrated Elasticsearch and Svelte, decoded XML from PDFs and processed the data, and Svelte/Leaflet combination to make more interactive displays of data.

# Lessons?
Working on Nine-90 for Legends Animation taught us that while creating real world applications can be stressful and challenging, working on it for a worthwhile cause can be extremely fulfilling. It was definitely intimidating when we were first introduced to the problems we needed to solve, but by working together we were able to achieve our goal!


# *** HOW TO USE *** 
- This is the tricky part!
  1. Get an instance of an IDE with a terminal function ( Visual Studio Code works but you can also run this project on Replit ) 
  2. In the terminal, check if you have the dependenices and modules installed by typing ```npm install```, ```npm install svelte```, and  ```npm install leaflet```
  3. In the terminal, type ```npm run dev``` and the terminal should pop up with a link to a local host
  4. You are free to use the website!

## Team Members
-   Sriya Pratipati
-   Ben Juntilla
-   Chelsea Gomez
-   Nathan Xie
-   Alexander Kim
