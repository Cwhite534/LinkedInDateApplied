# **Detailed Application Dates on LinkedIn**
A quick and dirty [Tampermonkey](https://www.tampermonkey.net/) script for displaying the exact datetime you applied to jobs on LinkedIn.

## **🛑 Problem**
When viewing jobs you’ve applied to on LinkedIn, the site only displays vague timeframes like:
- *"2 days ago"*
- *"3 weeks ago"*

It **doesn’t show the exact date and time** you applied 😞.

## **✅ Solution**
This script **intercepts LinkedIn’s GraphQL response** to extract the **exact timestamp** of when you applied. It then **replaces the vague time message** with a **detailed date and time**, such as:
- *"02-24-2025 11:43:36 AM"*

### **⚠️ Limitations**
🚫 **Only works for active job postings** – LinkedIn’s API **does not appear** to send timestamps for jobs that are no longer accepting applications. 
🚫 **Only works when viewing the full job listing page** – The **"My Jobs"** list API only provides a vague "X days ago" message, without a full timestamp. 
🚫 **Heavily dependent on LinkedIn's API** – Any changes to the API structure or response format may break this script.
