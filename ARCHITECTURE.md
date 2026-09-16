# Architecture Document: THHBD Hospital Operations Hub

## 1. Overview
The THHBD Hospital Operations Hub functions as an operational coordination layer uniting fragmented data sources (Epic Bed Planning, House Supervisor reports, ED assignments, OR/Cath schedules, and EVS status) into a single unified command interface.

## 2. Core Architectural Principles
- **Actionable Capacity Model**: Physical Bed ≠ Staffed Bed ≠ Actionable Bed. The calculation engine explicitly subtracts occupied beds, protected emergency capacity, EVS turnaround delays, and nurse workload constraints.
- **Modular Data Separation**: Types (`src/types/hospital.ts`), initial mock states (`src/data/initialData.ts`), calculation engines (`src/utils/capacityEngine.ts`), and views are cleanly decoupled.
- **Zero PHI Compliance**: All patient representations use generic identifiers (e.g., `ED Hold #1`, `CABG Return`) to comply with privacy regulations during prototyping.

## 3. Technology Stack
- **Frontend Framework**: React 18 + TypeScript with Vite bundler.
- **Styling**: Tailwind CSS configured with custom dark command-center color palettes.
- **Icons**: Lucide React.
