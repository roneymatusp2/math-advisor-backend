// src/components/LandingPage.tsx
import React from 'react';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
            {/* Background text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[20vw] font-bold text-gray-900 transform -rotate-12">
          Mathematics
        </span>
            </div>

            <div className="relative min-h-screen flex flex-col">
                <header className="w-full max-w-6xl mx-auto px-4 pt-8 pb-6">
                    <div className="flex items-center justify-between">
                        <div className="w-32">
                            <img
                                src="/St-Pauls logo-flat.png"
                                alt="St. Paul's School"
                                className="h-16 object-contain"
                            />
                        </div>
                        <div className="flex-grow flex justify-center">
                            <img
                                src="/ib-logo.png"
                                alt="IB Diploma Programme"
                                className="h-20 object-contain"
                            />
                        </div>
                        <div className="w-32"></div>
                    </div>
                </header>

                <main className="flex-grow flex flex-col items-center max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-[#003155] text-5xl font-bold mb-6">
                            IB Mathematics Course Selection
                        </h1>
                        <p className="text-gray-600 text-xl mb-4">
                            Find your ideal path in IB Mathematics
                        </p>
                        <div className="flex items-center justify-center gap-3 text-lg">
                            <span className="text-red-600 font-medium">Analysis & Approaches</span>
                            <span className="text-gray-500">or</span>
                            <span className="text-red-600 font-medium">Applications & Interpretation</span>
                        </div>
                    </div>

                    {/* Video */}
                    <div className="w-full max-w-4xl mb-8">
                        <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/GwisekGc2kY"
                                title="IB Mathematics: Your Journey, Your Choice"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="w-full max-w-4xl flex justify-center mb-16">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur-lg opacity-75 transition-all" />
                            <button
                                className="relative bg-red-600 text-white px-12 py-4 rounded-lg text-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105"
                                onClick={onStart}
                            >
                                Start Questionnaire →
                            </button>
                        </div>
                    </div>

                    {/* Info Box */}
                    <section className="w-full max-w-4xl bg-white rounded-xl p-8 shadow-lg mb-12">
                        <h2 className="text-[#003155] text-2xl font-bold mb-8">About This Questionnaire</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="space-y-2">
                                <h3 className="text-red-600 font-semibold flex items-center">📚 AA Higher Level</h3>
                                <p className="text-gray-600 ml-7">
                                    Balanced theoretical approach with manageable workload
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-red-600 font-semibold flex items-center">📚 AA Standard Level</h3>
                                <p className="text-gray-600 ml-7">
                                    Balanced theoretical approach with manageable workload
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-red-600 font-semibold flex items-center">📊 AI Higher Level</h3>
                                <p className="text-gray-600 ml-7">
                                    Practical mathematics with technology integration
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-red-600 font-semibold flex items-center">📊 AI Standard Level</h3>
                                <p className="text-gray-600 ml-7">
                                    Practical mathematics with technology integration
                                </p>
                            </div>
                        </div>

                        <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-4">Important Note</h3>
                            <p className="text-gray-700 mb-4">
                                Your responses will help determine which course best matches your:
                            </p>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-red-600">•</span> Mathematical interests and abilities
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-600">•</span> Learning style preferences
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-600">•</span> Academic and career goals
                                </li>
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LandingPage;
