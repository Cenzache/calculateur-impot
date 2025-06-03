import React, { useState, useMemo } from 'react';
import { User, Calculator, CheckCircle, FileText, Info } from 'lucide-react';
import About from './About';

const TaxEstimator = () => {
  const [currentView, setCurrentView] = useState('calculator'); // 'calculator' ou 'about'
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [manualData, setManualData] = useState({
    netAnnualSalary: '',
    currentTaxWithholding: ''
  });
  const [profile, setProfile] = useState({
    familySituation: 'single',
    children: 0,
    deductionType: 'standard10',
    realCosts: '',
    rentalIncome: ''
  });

  // Si on est sur la page About, l'afficher
  if (currentView === 'about') {
    return <About onBack={() => setCurrentView('calculator')} />;
  }

  // Barèmes d'imposition par année
  const taxBracketsByYear = {
    2024: [
      { min: 0, max: 11085, rate: 0 },
      { min: 11085, max: 28151, rate: 0.11 },
      { min: 28151, max: 80725, rate: 0.30 },
      { min: 80725, max: 174065, rate: 0.41 },
      { min: 174065, max: Infinity, rate: 0.45 }
    ],
    2025: [
      { min: 0, max: 11294, rate: 0 },
      { min: 11294, max: 28797, rate: 0.11 },
      { min: 28797, max: 82341, rate: 0.30 },
      { min: 82341, max: 177106, rate: 0.41 },
      { min: 177106, max: Infinity, rate: 0.45 }
    ]
  };

  // Déductions forfaitaires par année
  const deductionLimitsByYear = {
    2024: { min: 460, max: 13267 },
    2025: { min: 464, max: 13522 }
  };

  const taxBrackets = taxBracketsByYear[selectedYear];
  const deductionLimits = deductionLimitsByYear[selectedYear];

  // Calcul de l'impôt
  const calculateTax = useMemo(() => {
    const data = {
      netAnnualSalary: parseFloat(manualData.netAnnualSalary) || 0,
      currentTaxWithholding: parseFloat(manualData.currentTaxWithholding) || 0
    };
    
    if (!data || !data.netAnnualSalary) return null;

    const { netAnnualSalary } = data;
    
    // Application des déductions professionnelles
    let taxableIncome = netAnnualSalary;
    let deductionAmount = 0;
    
    if (profile.deductionType === 'standard10') {
      deductionAmount = Math.min(Math.max(netAnnualSalary * 0.10, deductionLimits.min), deductionLimits.max);
    } else if (profile.deductionType === 'realCosts' && profile.realCosts) {
      deductionAmount = parseFloat(profile.realCosts) || 0;
    }
    
    taxableIncome = Math.max(0, netAnnualSalary - deductionAmount);
    
    // Ajout des revenus fonciers nets
    const rentalIncome = parseFloat(profile.rentalIncome) || 0;
    taxableIncome += rentalIncome;

    // Calcul du quotient familial
    let familyShares = profile.familySituation === 'married' ? 2 : 1;
    familyShares += profile.children * 0.5;
    
    const quotientFamilial = taxableIncome / familyShares;
    
    // Calcul de l'impôt par tranches
    let taxBeforeFamily = 0;
    for (let bracket of taxBrackets) {
      if (quotientFamilial > bracket.min) {
        const taxableInThisBracket = Math.min(
          quotientFamilial - bracket.min, 
          bracket.max - bracket.min
        );
        taxBeforeFamily += taxableInThisBracket * bracket.rate;
      }
    }
    
    const totalTax = Math.max(0, taxBeforeFamily * familyShares);
    const monthlyTax = totalTax / 12;
    const effectiveRate = taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0;
    
    return {
      totalTax: Math.round(totalTax),
      monthlyTax: Math.round(monthlyTax),
      effectiveRate: Math.round(effectiveRate * 10) / 10,
      currentWithholding: data.currentTaxWithholding,
      difference: Math.round(totalTax - data.currentTaxWithholding),
      taxableIncome: Math.round(taxableIncome),
      deductionAmount: Math.round(deductionAmount),
      netAnnualSalary: Math.round(netAnnualSalary),
      rentalIncome: Math.round(rentalIncome)
    };
  }, [manualData, profile, selectedYear, taxBrackets, deductionLimits]);

  const handleManualSubmit = () => {
    if (!manualData.netAnnualSalary) return;
    setCurrentStep(2);
  };

  const handleProfileSubmit = () => {
    setCurrentStep(3);
  };

  const resetAll = () => {
    setCurrentStep(1);
    setManualData({ netAnnualSalary: '', currentTaxWithholding: '' });
    setProfile({ familySituation: 'single', children: 0, deductionType: 'standard10', realCosts: '', rentalIncome: '' });
  };

  return (
    <div 
      className="min-h-screen bg-white flex flex-col"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}
    >
      {/* Header avec pub discrète */}
      <div className="w-full">
        <div className="bg-gray-50 border-b border-gray-200 py-2">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <div className="flex justify-center flex-1">
              <div className="w-[728px] h-[90px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                Publicité
              </div>
            </div>
            <button
              onClick={() => setCurrentView('about')}
              className="flex items-center text-gray-600 hover:text-black transition-colors ml-4"
            >
              <Info className="w-4 h-4 mr-1" />
              À propos
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Progress indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    (currentStep === 'manual' && step === 1) || (typeof currentStep === 'number' && currentStep >= step)
                      ? 'bg-black text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {((currentStep === 'manual' && step === 1) || (typeof currentStep === 'number' && currentStep > step)) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      (typeof currentStep === 'number' && currentStep > step) ? 'bg-black' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step content */}
          <div className="min-h-[400px] flex items-center justify-center">
            {currentStep === 1 && (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl font-normal text-black">
                    Calculateur d'impôt sur le revenu
                  </h1>
                  
                  {/* Sélecteur d'année */}
                  <div className="flex justify-center">
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => setSelectedYear(2024)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedYear === 2024 
                            ? 'bg-black text-white' 
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        Impôts 2024
                      </button>
                      <button
                        onClick={() => setSelectedYear(2025)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedYear === 2025 
                            ? 'bg-black text-white' 
                            : 'text-gray-600 hover:text-black'
                        }`}
                      >
                        Impôts 2025
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 max-w-md mx-auto">
                    Estimez rapidement votre impôt {selectedYear} en quelques clics
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <button
                    onClick={() => setCurrentStep('manual')}
                    className="w-full bg-black hover:bg-gray-800 transition-colors text-white rounded-lg p-8 flex flex-col items-center space-y-4"
                  >
                    <FileText className="w-10 h-10" />
                    <div className="space-y-2">
                      <div className="text-lg font-medium">
                        Commencer l'estimation
                      </div>
                      <div className="text-sm opacity-90">
                        Saisie rapide • Calcul immédiat
                      </div>
                    </div>
                  </button>
                </div>

                <div className="text-xs text-gray-400 max-w-md mx-auto">
                  Outil gratuit • Vos données restent confidentielles
                </div>
              </div>
            )}

            {currentStep === 'manual' && (
              <div className="max-w-md mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-normal text-black">
                    Saisie de vos revenus
                  </h2>
                  <p className="text-sm text-gray-600">
                    Renseignez les informations de votre dernière fiche de paie
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Salaire net annuel (€)
                    </label>
                    <input
                      type="number"
                      value={manualData.netAnnualSalary}
                      onChange={(e) => setManualData(prev => ({ ...prev, netAnnualSalary: e.target.value }))}
                      placeholder="Ex: 42000"
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Prélèvement à la source annuel (€)
                    </label>
                    <input
                      type="number"
                      value={manualData.currentTaxWithholding}
                      onChange={(e) => setManualData(prev => ({ ...prev, currentTaxWithholding: e.target.value }))}
                      placeholder="Ex: 3200 (optionnel)"
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Montant actuel prélevé par votre employeur (optionnel)
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleManualSubmit}
                    disabled={!manualData.netAnnualSalary}
                    className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="max-w-md mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Données saisies</span>
                  </div>
                  <h2 className="text-2xl font-normal text-black">
                    Informations complémentaires
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Situation familiale */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Situation familiale
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="familySituation"
                          value="single"
                          checked={profile.familySituation === 'single'}
                          onChange={(e) => setProfile(prev => ({ ...prev, familySituation: e.target.value }))}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300"
                        />
                        <span className="ml-2 text-sm text-black">Célibataire</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="familySituation"
                          value="married"
                          checked={profile.familySituation === 'married'}
                          onChange={(e) => setProfile(prev => ({ ...prev, familySituation: e.target.value }))}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300"
                        />
                        <span className="ml-2 text-sm text-black">Marié(e) ou pacsé(e)</span>
                      </label>
                    </div>
                  </div>

                  {/* Nombre d'enfants */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Nombre d'enfants à charge
                    </label>
                    <input
                      type="number"
                      value={profile.children}
                      onChange={(e) => setProfile(prev => ({ ...prev, children: Math.max(0, parseInt(e.target.value) || 0) }))}
                      min="0"
                      max="10"
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                  </div>

                  {/* Déductions professionnelles */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-3">
                      Déductions professionnelles
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="deductionType"
                          value="standard10"
                          checked={profile.deductionType === 'standard10'}
                          onChange={(e) => setProfile(prev => ({ ...prev, deductionType: e.target.value }))}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300 mt-0.5"
                        />
                        <div className="ml-2">
                          <span className="text-sm text-black">Déduction forfaitaire de 10%</span>
                          <div className="text-xs text-gray-500 mt-1">
                            Déduction automatique (min. {deductionLimits.min}€, max. {deductionLimits.max.toLocaleString('fr-FR')}€)
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-start">
                        <input
                          type="radio"
                          name="deductionType"
                          value="realCosts"
                          checked={profile.deductionType === 'realCosts'}
                          onChange={(e) => setProfile(prev => ({ ...prev, deductionType: e.target.value }))}
                          className="w-4 h-4 text-black focus:ring-black border-gray-300 mt-0.5"
                        />
                        <div className="ml-2 flex-1">
                          <span className="text-sm text-black">Frais réels</span>
                          <div className="text-xs text-gray-500 mt-1 mb-2">
                            Déduction de vos frais professionnels réels
                          </div>
                          {profile.deductionType === 'realCosts' && (
                            <input
                              type="number"
                              value={profile.realCosts}
                              onChange={(e) => setProfile(prev => ({ ...prev, realCosts: e.target.value }))}
                              placeholder="Montant des frais réels (€)"
                              className="w-full px-3 py-2 bg-gray-50 border-0 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Revenus fonciers */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Revenus fonciers nets (€)
                    </label>
                    <input
                      type="number"
                      value={profile.rentalIncome}
                      onChange={(e) => setProfile(prev => ({ ...prev, rentalIncome: e.target.value }))}
                      placeholder="Ex: 12000 (optionnel)"
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Revenus locatifs après déduction des charges
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProfileSubmit}
                  disabled={profile.deductionType === 'realCosts' && !profile.realCosts}
                  className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Calculer mon impôt
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Zone pub avant les résultats */}
                <div className="flex justify-center">
                  <div className="w-[336px] h-[280px] bg-gray-100 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">
                    Publicité
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-normal text-black">
                    Votre estimation d'impôt {selectedYear}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Salaires : {calculateTax?.netAnnualSalary.toLocaleString('fr-FR')}€
                    {calculateTax?.rentalIncome > 0 && (
                      <> • Fonciers : {calculateTax?.rentalIncome.toLocaleString('fr-FR')}€</>
                    )}
                    <br />
                    Déduction : {calculateTax?.deductionAmount.toLocaleString('fr-FR')}€ • 
                    Base imposable : {calculateTax?.taxableIncome.toLocaleString('fr-FR')}€
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-black mb-2">
                      {calculateTax?.totalTax.toLocaleString('fr-FR')}€
                    </div>
                    <div className="text-sm text-black font-medium">Impôt annuel estimé</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Taux effectif : {calculateTax?.effectiveRate}%
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-black mb-2">
                      {calculateTax?.monthlyTax.toLocaleString('fr-FR')}€
                    </div>
                    <div className="text-sm text-black font-medium">Prélèvement mensuel</div>
                    <div className="text-xs text-gray-600 mt-1">
                      À la source estimé
                    </div>
                  </div>
                </div>

                {calculateTax?.currentWithholding > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-900 mb-2">
                      Comparaison avec votre prélèvement actuel
                    </div>
                    <div className="text-xs text-blue-700">
                      Prélèvement actuel : {calculateTax.currentWithholding.toLocaleString('fr-FR')}€/an
                      <br />
                      Différence : {calculateTax.difference > 0 ? '+' : ''}{calculateTax.difference.toLocaleString('fr-FR')}€
                      {calculateTax.difference > 0 ? ' (vous pourriez devoir un complément)' : ' (vous pourriez avoir un remboursement)'}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetAll}
                    className="flex-1 bg-gray-100 text-black py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Nouvelle estimation
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Imprimer le résultat
                  </button>
                </div>

                <div className="text-xs text-gray-500 text-center bg-gray-50 p-4 rounded-lg">
                  Cette estimation est indicative et basée sur les barèmes fiscaux {selectedYear}. 
                  Elle ne remplace pas un calcul officiel et ne tient pas compte de situations particulières.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer avec mentions légales */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Calculateur-Impot.fr • Estimation indicative • 
            <a href="#" onClick={() => setCurrentView('about')} className="hover:text-gray-700 ml-1">À propos</a> • 
            <a href="#" className="hover:text-gray-700 ml-1">Contact</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TaxEstimator;
