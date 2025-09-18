# Integrazione Google Analytics 4 - Configuratore Carport

## Panoramica
Il sistema di tracking Google Analytics 4 è stato integrato nel configuratore "coperture auto" per monitorare il comportamento degli utenti e le conversioni.

## File Modificati

### 1. `lib/analytics/gtag.ts`
**Funzione**: Libreria centrale per il tracking GA4
**Funzionalità**:
- `initializeGoogleAnalytics()` - Inizializza GA4 se non già presente
- `trackConfiguratorStep()` - Traccia navigazione tra step
- `trackConfiguratorSubmit()` - Traccia invio configurazione
- `trackConfiguratorAbandon()` - Traccia abbandoni/uscite
- `setupAbandonTracking()` - Configura listener per abbandoni

### 2. `app/layout.tsx`
**Modifiche**: Aggiunto script gtag.js nel `<head>`
**Linee**: Script Google Analytics con ID placeholder "G-XXXXXXXXXX"

### 3. `app/configuratore/page.tsx`
**Modifiche**: 
- Import funzioni tracking (linea ~8)
- `useEffect` per inizializzazione GA4 (linea ~45)
- `useEffect` per tracking cambio step (linea ~58)
**Funzionalità**: Traccia ogni step e configura tracking abbandono

### 4. `components/configurator/step7-package.tsx`
**Modifiche**: 
- Import `trackConfiguratorSubmit` (linea ~6)
- Chiamata tracking nel `handleSubmit()` (linea ~145)
**Funzionalità**: Traccia invio configurazione completata

## Eventi Tracciati

### 1. `configurator_step`
**Quando**: Ad ogni cambio step del configuratore
**Parametri**:
- `configurator_name`: "coperture_auto"
- `step_name`: "step_1_modello", "step_2_tipo_struttura", etc.
- `traffic_source`: utm_source o dominio referrer
- `traffic_medium`: utm_medium o "referral"
- `previous_step`: step precedente
- `configuration_progress`: percentuale completamento

### 2. `configurator_form_submit`
**Quando**: Invio configurazione completata
**Parametri**:
- `configurator_name`: "coperture_auto"
- `step_name`: "form_submit"
- `traffic_source/medium`: come sopra
- `package_type`: tipo servizio scelto
- `contact_preference`: preferenza contatto
- `customer_city/province`: dati geografici
- `structure_type`: tipo struttura selezionata

### 3. `configurator_abandon`
**Quando**: Uscita/refresh/cambio tab durante configurazione
**Parametri**:
- `configurator_name`: "coperture_auto"
- `step_name`: step corrente al momento dell'abbandono
- `traffic_source/medium`: come sopra
- `abandon_type`: "page_unload" o "tab_hidden"

## Configurazione Richiesta

1. **Sostituire ID Google Analytics**: Cambiare "G-XXXXXXXXXX" con l'ID reale in:
   - `app/layout.tsx` (2 occorrenze)
   - `app/configuratore/page.tsx` (1 occorrenza)

2. **Test**: Verificare in Google Analytics 4 che gli eventi vengano ricevuti correttamente

## Note Tecniche
- Il tracking funziona solo lato client (browser)
- Include fallback per referrer se mancano parametri UTM
- Console.log attivi per debug (rimuovere in produzione)
- Gestione errori per evitare interruzioni UX
