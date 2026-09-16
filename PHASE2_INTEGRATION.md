# Phase 2 Integration Guide: THHBD Hospital Operations Hub

Once the MVP prototype is validated by clinical operations and House Supervisors, the following integration pathways can be implemented:

1. **SharePoint Lists & Power Automate**:
   - Map inbound demand queues and action items to SharePoint lists.
   - Use Power Automate triggers to automatically broadcast critical capacity alerts (`WATCH`, `ALERT`, `CRITICAL`) directly into Microsoft Teams channels.

2. **Microsoft Teams Bot Integration**:
   - Connect the simulated Teams action loop to the Microsoft Graph API to enable direct two-way chat updates and acknowledgement buttons from mobile Teams clients.

3. **Power BI Dashboards**:
   - Export throughput metrics (median RTP to assignment, delay root-cause distributions) to Power BI dataflows for executive reporting.

4. **Epic Extracts / APIs (FHIR / HL7)**:
   - Establish secure FHIR APIs or batch CSV extracts from Epic Bed Planning and ADT feeds to replace local mock JSON state with live hospital feeds.
