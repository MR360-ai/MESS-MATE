const { useState, useEffect, useMemo } = React;

// Main Application Component matching Stitch Project 17051664415263210848 Design System
function App() {
  // Persistence with localStorage
  const [messes, setMesses] = useState(() => {
    const saved = localStorage.getItem('messmate_messes');
    return saved ? JSON.parse(saved) : window.INITIAL_MESSES;
  });

  const [userPasses, setUserPasses] = useState(() => {
    const saved = localStorage.getItem('messmate_user_passes');
    return saved ? JSON.parse(saved) : [
      {
        id: "PASS-78921",
        messId: "mess-1",
        messName: "Royal Campus Feast",
        planType: "30-Day Monthly Pass",
        meals: ["Lunch", "Dinner"],
        studentName: "Alex Morgan",
        rollNo: "CS2024-892",
        validUntil: "30 Aug 2026",
        remainingMeals: 54,
        pricePaid: 1920,
        qrCode: "MESSMATE-78921-ROYAL-ALEX"
      }
    ];
  });

  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'owner'
  const [selectedOwnerMessId, setSelectedOwnerMessId] = useState('mess-1');
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxDistance, setMaxDistance] = useState(2.0);
  const [onlyPureVeg, setOnlyPureVeg] = useState(false);
  const [onlyJain, setOnlyJain] = useState(false);
  const [selectedMealSession, setSelectedMealSession] = useState('lunch');
  const [sortBy, setSortBy] = useState('availableSeats');

  // Modals
  const [detailModalMess, setDetailModalMess] = useState(null);
  const [passModalMess, setPassModalMess] = useState(null);
  const [showMyPassesModal, setShowMyPassesModal] = useState(false);
  const [activeQrPass, setActiveQrPass] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    localStorage.setItem('messmate_messes', JSON.stringify(messes));
  }, [messes]);

  useEffect(() => {
    localStorage.setItem('messmate_user_passes', JSON.stringify(userPasses));
  }, [userPasses]);

  // Owner Seat occupancy update handler
  const handleUpdateSeatCount = (messId, newOccupied) => {
    setMesses(prev => prev.map(m => {
      if (m.id === messId) {
        return { ...m, occupiedSeats: Math.max(0, Math.min(m.capacity, newOccupied)) };
      }
      return m;
    }));
    showToast(`Updated live seat count!`);
  };

  // Owner Menu update handler
  const handleUpdateTodayMenu = (messId, sessionKey, updatedSessionData) => {
    setMesses(prev => prev.map(m => {
      if (m.id === messId) {
        return {
          ...m,
          todayMenu: {
            ...m.todayMenu,
            [sessionKey]: updatedSessionData
          }
        };
      }
      return m;
    }));
    showToast(`Updated ${sessionKey.toUpperCase()} menu!`);
  };

  // Owner Announcement update
  const handleUpdateAnnouncement = (messId, text) => {
    setMesses(prev => prev.map(m => {
      if (m.id === messId) {
        return { ...m, announcement: text };
      }
      return m;
    }));
    showToast(`Updated mess announcement!`);
  };

  // Add student review handler
  const handleAddReview = (messId, newReview) => {
    setMesses(prev => prev.map(m => {
      if (m.id === messId) {
        const updatedReviews = [newReview, ...m.reviews];
        const newCount = m.reviewCount + 1;
        const totalScore = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newRating = Number((totalScore / updatedReviews.length).toFixed(1));
        return {
          ...m,
          reviews: updatedReviews,
          reviewCount: newCount,
          rating: newRating
        };
      }
      return m;
    }));
    showToast("Review submitted successfully! Thank you!");
  };

  // Book Pass Handler
  const handleBookPass = (passData) => {
    setUserPasses(prev => [passData, ...prev]);
    setActiveQrPass(passData);
    setPassModalMess(null);
    showToast(`🎉 Congratulations! Mess Pass ${passData.id} issued.`);
  };

  // Filtered & Sorted Messes
  const filteredMesses = useMemo(() => {
    return messes.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.todayMenu.lunch.dishes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            m.todayMenu.dinner.dishes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      const matchesDistance = m.distanceKm <= maxDistance;
      const matchesPureVeg = !onlyPureVeg || m.isPureVeg;
      const matchesJain = !onlyJain || m.hasJain;

      return matchesSearch && matchesCategory && matchesDistance && matchesPureVeg && matchesJain;
    }).sort((a, b) => {
      if (sortBy === 'availableSeats') {
        const availA = a.capacity - a.occupiedSeats;
        const availB = b.capacity - b.occupiedSeats;
        return availB - availA;
      }
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.pricePerMeal - b.pricePerMeal;
      return 0;
    });
  }, [messes, searchQuery, selectedCategory, maxDistance, onlyPureVeg, onlyJain, sortBy]);

  const totalCapacity = messes.reduce((acc, m) => acc + m.capacity, 0);
  const totalOccupied = messes.reduce((acc, m) => acc + m.occupiedSeats, 0);
  const totalAvailableSeats = totalCapacity - totalOccupied;

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-primary-container text-white font-bold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>{toast}</span>
        </div>
      )}

      {/* TopAppBar matching Stitch Design */}
      <header className="w-full sticky top-0 z-50 bg-surface shadow-[0px_4px_20px_rgba(0,0,0,0.04)] border-b border-surface-container">
        <nav className="flex justify-between items-center px-gutter py-3.5 max-w-container-max mx-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white font-extrabold text-xl shadow-orange-glow">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <div>
              <div className="font-display text-2xl font-black tracking-tight text-primary">MessMate</div>
              <p className="text-[11px] font-label text-on-surface-variant hidden sm:block">Campus Dining & Real-Time Menu Network</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-6 items-center">
            <a href="#explore" className="font-label text-sm font-bold text-primary border-b-2 border-primary pb-0.5">Explore</a>
            <a href="#explore" className="font-label text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Live Menu</a>
            
            {/* My Mess Passes Button */}
            <button 
              onClick={() => setShowMyPassesModal(true)}
              className="relative bg-surface-container-low hover:bg-surface-container text-on-surface font-label text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">confirmation_number</span>
              <span>My Mess Passes</span>
              {userPasses.length > 0 && (
                <span className="bg-secondary text-white font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                  {userPasses.length}
                </span>
              )}
            </button>

            {/* Role Switcher */}
            <div className="bg-surface-container p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setActiveRole('student')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-label transition ${
                  activeRole === 'student'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                🎓 Student
              </button>
              <button
                onClick={() => setActiveRole('owner')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-label transition ${
                  activeRole === 'owner'
                    ? 'bg-primary-container text-white shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                👨‍🍳 Owner Portal
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main View Mode */}
      {activeRole === 'student' ? (
        <main className="flex-grow">
          {/* Hero Section from Stitch Project 17051664415263210848 */}
          <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-surface-container-lowest border-b border-surface-container">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              <div className="z-10">
                <span className="inline-block px-4 py-1 bg-primary-container/10 text-primary font-label text-xs font-bold rounded-full mb-4">
                  #1 Choice for Student Dining
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-on-background tracking-tight mb-4 leading-tight">
                  Find your perfect meal, <span className="text-primary-container">instantly.</span>
                </h1>
                <p className="font-body text-base md:text-lg text-on-surface-variant mb-6 max-w-lg leading-relaxed">
                  Live Menus, Seat Availability, and Reviews for students. Stop guessing what's for lunch and start eating better today.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#explore"
                    className="px-6 py-3.5 bg-primary-container text-white font-display font-bold rounded-xl shadow-orange-glow hover:shadow-orange-glow-lg transition-all active:scale-95 text-center text-sm"
                  >
                    Find a Mess
                  </a>
                  <button
                    onClick={() => setActiveRole('owner')}
                    className="px-6 py-3.5 border-2 border-secondary text-secondary font-display font-bold rounded-xl hover:bg-secondary/5 transition-all active:scale-95 text-sm"
                  >
                    For Mess Owners
                  </button>
                </div>

                {/* Campus Occupancy Bar */}
                <div className="mt-8 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/30 max-w-md">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-label text-xs font-bold text-on-surface flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary live-indicator-green"></span>
                      Campus Seat Capacity
                    </span>
                    <span className="font-label text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-0.5 rounded-full">
                      {totalAvailableSeats} Free Seats Right Now
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="bg-secondary h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round((totalOccupied / totalCapacity) * 100))}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Hero Visual Block */}
              <div className="relative hidden md:block">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl z-10 border-8 border-white">
                  <img
                    className="w-full aspect-[4/3] object-cover"
                    src="assets/royal_thali.png"
                    alt="Campus Mess Dining Hall"
                  />
                  <div className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-xl flex items-center gap-2 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container live-indicator"></span>
                    <span className="font-label text-xs font-bold text-on-surface">Live Menus Active</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl z-20 border border-white/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-secondary-container text-2xl">event_seat</span>
                    </div>
                    <div>
                      <p className="font-label text-xs text-on-surface-variant font-medium">Live Campus Occupancy</p>
                      <p className="font-display font-extrabold text-secondary text-lg">
                        {Math.round((totalOccupied / totalCapacity) * 100)}% Capacity Occupied
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid Features Section matching Stitch */}
          <section className="py-16 bg-surface">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-extrabold text-on-background">Everything you need to eat well.</h2>
                <p className="font-body text-base text-on-surface-variant mt-2">Built for speed, hygiene, and full transparency around your campus.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1: Live Menus */}
                <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col md:flex-row gap-6 group border border-surface-container">
                  <div className="flex-1">
                    <div className="w-12 h-12 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-primary-container text-2xl">restaurant_menu</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">Real-time Menus</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      Access updated daily menus before you even leave your room. No more guessing or repeated dishes.
                    </p>
                    <ul className="mt-4 space-y-2 font-label text-xs">
                      <li className="flex items-center gap-2 text-secondary font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span> Instant live updates from mess owners
                      </li>
                      <li className="flex items-center gap-2 text-secondary font-semibold">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span> Smart dietary tags (Pure Veg / Jain / Non-Veg)
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden h-44 md:h-auto">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="assets/annapurna.png" alt="Pure Veg Mess" />
                  </div>
                </div>

                {/* Feature 2: Seat Tracking */}
                <div className="bg-white p-6 rounded-3xl shadow-card-subtle hover:shadow-card-hover transition-all flex flex-col justify-between border border-surface-container">
                  <div>
                    <div className="w-12 h-12 bg-secondary-container/30 rounded-2xl flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-secondary text-2xl">sensors</span>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">Live Seat Tracking</h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      Check how crowded your favorite mess is in real-time to skip long dining queues.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-container">
                    <div className="flex justify-between mb-1 text-xs">
                      <span className="font-label font-bold text-on-surface">Campus Average</span>
                      <span className="font-label text-secondary font-bold">Moderate Crowd</span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mess Discovery & Cards Section */}
          <section id="explore" className="py-12 bg-surface-container-lowest border-t border-surface-container">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              {/* Search & Filter Header */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-extrabold text-on-background">Explore Nearby Campus Messes</h2>
                    <p className="text-xs font-body text-on-surface-variant">Showing active messes within {maxDistance} km of campus</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      placeholder="Search Paneer, Dosa, Thali..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-outline-variant/60 rounded-xl px-4 py-2.5 pl-10 text-xs font-body text-on-surface focus:outline-none focus:border-primary-container shadow-sm"
                    />
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-lg">search</span>
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2 text-xs text-on-surface-variant font-bold">✕</button>
                    )}
                  </div>
                </div>

                {/* Meal Session Selector Pills */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-outline-variant/40 shadow-card-subtle">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-label text-xs font-bold text-on-surface-variant mr-1">Meal Session:</span>
                    {[
                      { key: 'breakfast', label: '🍳 Breakfast' },
                      { key: 'lunch', label: '🍲 Lunch (Live)' },
                      { key: 'snacks', label: '☕ Evening Tea' },
                      { key: 'dinner', label: '🍛 Dinner' }
                    ].map(sess => (
                      <button
                        key={sess.key}
                        onClick={() => setSelectedMealSession(sess.key)}
                        className={`px-3 py-1.5 rounded-xl font-label text-xs font-bold transition ${
                          selectedMealSession === sess.key
                            ? 'bg-primary-container text-white shadow-md'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {sess.label}
                      </button>
                    ))}
                  </div>

                  {/* Category Pills & Sort */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      {['All', 'Pure Veg', 'South Indian'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1 rounded-lg text-xs font-label font-semibold ${
                            selectedCategory === cat ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface-variant'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-surface-container-low border border-outline-variant/40 text-on-surface font-label text-xs rounded-xl px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="availableSeats">🟢 Available Seats</option>
                      <option value="distance">📍 Distance</option>
                      <option value="rating">⭐ Rating</option>
                      <option value="price">💰 Price</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mess Cards Grid matching Stitch Design */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMesses.map(mess => (
                  <MessCard
                    key={mess.id}
                    mess={mess}
                    selectedMealSession={selectedMealSession}
                    onOpenDetail={() => setDetailModalMess(mess)}
                    onOpenPass={() => setPassModalMess(mess)}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* Owner Dashboard View */
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 w-full flex-grow">
          <OwnerDashboard
            messes={messes}
            selectedOwnerMessId={selectedOwnerMessId}
            onSelectMess={setSelectedOwnerMessId}
            onUpdateSeatCount={handleUpdateSeatCount}
            onUpdateTodayMenu={handleUpdateTodayMenu}
            onUpdateAnnouncement={handleUpdateAnnouncement}
          />
        </main>
      )}

      {/* Modals */}
      {detailModalMess && (
        <MessDetailModal
          mess={detailModalMess}
          onClose={() => setDetailModalMess(null)}
          onOpenPass={() => {
            const m = detailModalMess;
            setDetailModalMess(null);
            setPassModalMess(m);
          }}
          onAddReview={(newRev) => handleAddReview(detailModalMess.id, newRev)}
        />
      )}

      {passModalMess && (
        <MessPassModal
          mess={passModalMess}
          onClose={() => setPassModalMess(null)}
          onBookPass={handleBookPass}
        />
      )}

      {showMyPassesModal && (
        <UserPassesModal
          passes={userPasses}
          onClose={() => setShowMyPassesModal(false)}
          onSelectPass={(pass) => setActiveQrPass(pass)}
        />
      )}

      {activeQrPass && (
        <QrTicketModal
          pass={activeQrPass}
          onClose={() => setActiveQrPass(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-surface-container py-8 px-margin-desktop text-xs font-body text-on-surface-variant text-center">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-primary">MessMate</span>
            <span>• Live Campus Dining Platform</span>
          </div>
          <div>FSSAI Verified Hygiene Network • 24/7 Student Support</div>
        </div>
      </footer>
    </div>
  );
}

// ----------------------------------------------------
// Mess Card Component matching Stitch Screen UI
// ----------------------------------------------------
function MessCard({ mess, selectedMealSession, onOpenDetail, onOpenPass }) {
  const currentMenuSession = mess.todayMenu[selectedMealSession] || mess.todayMenu.lunch;
  const availableSeats = Math.max(0, mess.capacity - mess.occupiedSeats);
  const occupancyPercent = Math.round((mess.occupiedSeats / mess.capacity) * 100);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-surface-container shadow-card-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Banner Image with Overlays */}
        <div className="relative h-52 w-full overflow-hidden bg-surface-container">
          <img
            src={mess.image}
            alt={mess.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Top Left Pills */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={`text-[11px] font-label font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${
              mess.isPureVeg 
                ? 'bg-secondary/90 border-secondary text-white' 
                : 'bg-white/90 border-slate-200 text-on-surface'
            }`}>
              {mess.isPureVeg ? '🌱 Pure Veg' : '🍗 Veg & Non-Veg'}
            </span>
          </div>

          {/* Top Right Live Pulse Pill */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-primary-container live-indicator"></span>
            <span className="font-label text-[11px] font-bold text-on-surface">Live Menu</span>
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
            <div>
              <h3 className="font-display text-xl font-extrabold drop-shadow-sm">{mess.name}</h3>
              <p className="text-xs font-body text-white/90">{mess.distanceText}</p>
            </div>
            <div className="bg-primary-container text-white px-2.5 py-1 rounded-lg font-label text-xs font-extrabold flex items-center gap-1 shadow-md">
              <span>⭐</span>
              <span>{mess.rating}</span>
            </div>
          </div>
        </div>

        {/* Live Seat Occupancy Meter */}
        <div className="p-4 bg-surface-container-low border-b border-surface-container">
          <div className="flex justify-between items-center mb-1.5 text-xs font-label">
            <span className="font-bold text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">event_seat</span>
              Seat Availability
            </span>
            <span className="font-bold text-on-surface">
              <strong className="text-secondary font-extrabold">{mess.occupiedSeats}</strong> / {mess.capacity} seats ({availableSeats} free)
            </span>
          </div>
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                occupancyPercent >= 85 ? 'bg-rose-500' : occupancyPercent >= 60 ? 'bg-amber-500' : 'bg-secondary'
              }`}
              style={{ width: `${occupancyPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Active Meal Session Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-label text-xs font-bold text-primary uppercase tracking-wider">
              Today's {selectedMealSession.toUpperCase()}
            </span>
            <span className="font-label text-xs font-extrabold text-secondary bg-secondary-container/30 px-2.5 py-0.5 rounded-full">
              ₹{currentMenuSession.price} / meal
            </span>
          </div>

          <div className="bg-surface-container-low p-3 rounded-2xl border border-surface-container">
            <div className="font-display font-bold text-sm text-on-surface mb-1.5">
              {currentMenuSession.title}
            </div>
            <ul className="grid grid-cols-2 gap-1 text-xs font-body text-on-surface-variant">
              {currentMenuSession.dishes.map((dish, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="text-primary-container">•</span>
                  <span>{dish}</span>
                </li>
              ))}
            </ul>
          </div>

          {mess.announcement && (
            <div className="text-xs font-body bg-primary-container/10 text-primary p-2.5 rounded-xl border border-primary-container/20 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span className="truncate">{mess.announcement}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons matching Stitch Design */}
      <div className="p-4 border-t border-surface-container grid grid-cols-2 gap-3 bg-surface-container-lowest">
        <button
          onClick={onOpenDetail}
          className="w-full border-2 border-secondary text-secondary hover:bg-secondary/5 font-display font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <span>Weekly Schedule</span>
        </button>

        <button
          onClick={onOpenPass}
          className="w-full bg-primary-container hover:bg-primary text-white font-display font-bold py-2.5 rounded-xl text-xs transition shadow-orange-glow flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
          <span>Book Pass & QR</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Mess Detail Modal
// ----------------------------------------------------
function MessDetailModal({ mess, onClose, onOpenPass, onAddReview }) {
  const [activeDay, setActiveDay] = useState('Monday');
  const [revName, setRevName] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState(5);

  const daySchedule = mess.weeklySchedule[activeDay] || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!revName || !revComment) return;
    onAddReview({
      id: "r-" + Date.now(),
      student: revName + " (Verified Student)",
      rating: Number(revRating),
      date: "Just Now",
      comment: revComment
    });
    setRevName('');
    setRevComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-surface-container my-6 animate-fade-in max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative h-44 bg-surface-container">
          <img src={mess.image} alt={mess.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 hover:bg-white text-on-surface w-8 h-8 rounded-full font-bold shadow">✕</button>

          <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end text-white">
            <div>
              <span className="text-xs bg-primary-container px-2.5 py-0.5 rounded-full font-label font-bold">{mess.category}</span>
              <h2 className="font-display text-2xl font-extrabold mt-1">{mess.name}</h2>
              <p className="text-xs text-white/90">{mess.distanceText} • Hygiene Rating: <strong className="text-secondary">{mess.hygieneRating}</strong></p>
            </div>
            <button onClick={onOpenPass} className="bg-primary-container text-white font-display font-bold px-4 py-2 rounded-xl text-xs shadow-orange-glow">
              🎟️ Book Pass
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow text-xs font-body">
          {/* 7-Day Schedule */}
          <div>
            <h3 className="font-display text-base font-extrabold text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container">calendar_today</span>
              7-Day Weekly Meal Schedule
            </h3>

            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-3 py-1.5 rounded-xl font-label text-xs font-bold transition shrink-0 ${
                    activeDay === day ? 'bg-primary-container text-white shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container space-y-2">
              <div className="flex justify-between border-b border-surface-container pb-2">
                <span className="font-label font-bold text-on-surface-variant">🍳 Breakfast</span>
                <span className="font-body font-bold text-on-surface">{daySchedule.breakfast}</span>
              </div>
              <div className="flex justify-between border-b border-surface-container pb-2">
                <span className="font-label font-bold text-on-surface-variant">🍲 Lunch</span>
                <span className="font-body font-bold text-primary">{daySchedule.lunch}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-label font-bold text-on-surface-variant">🍛 Dinner</span>
                <span className="font-body font-bold text-secondary">{daySchedule.dinner}</span>
              </div>
            </div>
          </div>

          {/* Student Reviews */}
          <div>
            <h3 className="font-display text-base font-extrabold text-on-surface mb-3 flex items-center justify-between">
              <span>Student Reviews ({mess.reviews.length})</span>
              <span className="text-primary font-bold">⭐ {mess.rating} / 5.0</span>
            </h3>

            <div className="space-y-3 mb-4">
              {mess.reviews.map(r => (
                <div key={r.id} className="bg-surface-container-low p-3.5 rounded-2xl border border-surface-container">
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-on-surface font-display">{r.student}</span>
                    <span className="text-amber-500 font-label">{"⭐".repeat(Math.round(r.rating))}</span>
                  </div>
                  <p className="text-on-surface-variant">{r.comment}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl border border-surface-container space-y-3">
              <h4 className="font-display font-bold text-on-surface">Leave a Student Review</h4>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Rohan - ECE)"
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-2 text-xs"
                  required
                />
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-2 text-xs"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
                  <option value="4">⭐⭐⭐⭐ 4 - Good</option>
                  <option value="3">⭐⭐⭐ 3 - Average</option>
                </select>
              </div>
              <textarea
                placeholder="Share your experience..."
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2 text-xs h-16"
                required
              />
              <button type="submit" className="bg-primary-container text-white font-display font-bold px-4 py-2 rounded-xl text-xs">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Mess Pass Calculator Modal
// ----------------------------------------------------
function MessPassModal({ mess, onClose, onBookPass }) {
  const [planType, setPlanType] = useState('monthly');
  const [selectedMeals, setSelectedMeals] = useState(['Lunch', 'Dinner']);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  let basePrice = mess.pricePerMeal;
  let totalMealCount = 1;
  let planLabel = "1-Day Trial Pass";

  if (planType === 'trial') {
    totalMealCount = selectedMeals.length;
    basePrice = mess.pricePerMeal * totalMealCount;
    planLabel = "1-Day Trial Ticket";
  } else if (planType === 'flex') {
    totalMealCount = selectedMeals.length * 7;
    basePrice = Math.round(mess.pricePerMeal * totalMealCount * 0.88);
    planLabel = "7-Day Flex Pass";
  } else if (planType === 'monthly') {
    totalMealCount = selectedMeals.length * 30;
    basePrice = Math.round(mess.pricePerMeal * totalMealCount * 0.75);
    planLabel = "30-Day Monthly Pass";
  }

  const discountAmount = Math.round((basePrice * appliedDiscount) / 100);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyCoupon = () => {
    if (window.PROMO_CODES[couponCode.toUpperCase()]) {
      setAppliedDiscount(window.PROMO_CODES[couponCode.toUpperCase()].discountPercent);
    }
  };

  const handleConfirm = () => {
    const passId = "PASS-" + Math.floor(10000 + Math.random() * 90000);
    onBookPass({
      id: passId,
      messId: mess.id,
      messName: mess.name,
      planType: planLabel,
      meals: selectedMeals,
      studentName: "Alex Morgan",
      rollNo: "CS2026-942",
      validUntil: planType === 'monthly' ? '30 Days from Today' : '7 Days from Today',
      remainingMeals: totalMealCount,
      pricePaid: finalPrice,
      qrCode: `MESSMATE-${passId}-${mess.name.toUpperCase().replace(/\s+/g, '')}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl border border-surface-container animate-fade-in text-xs font-body">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-display text-lg font-extrabold text-on-surface">Book Mess Pass - {mess.name}</h3>
          <button onClick={onClose} className="text-on-surface-variant font-bold">✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-label font-bold text-on-surface block mb-2">Select Subscription Plan:</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'trial', label: '1-Day Trial' },
                { key: 'flex', label: '7-Day Flex (12% Off)' },
                { key: 'monthly', label: '30-Day Pass (25% Off)' }
              ].map(p => (
                <button
                  key={p.key}
                  onClick={() => setPlanType(p.key)}
                  className={`p-3 rounded-2xl border text-left font-label font-bold transition ${
                    planType === p.key ? 'bg-primary-container text-white border-primary-container shadow-md' : 'bg-surface-container-low text-on-surface border-surface-container'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low p-3 rounded-2xl flex items-center justify-between">
            <input
              type="text"
              placeholder="Promo Code (CAMPUS20)"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="bg-white border border-outline-variant/40 rounded-xl px-3 py-1 text-xs uppercase"
            />
            <button onClick={handleApplyCoupon} className="bg-secondary text-white font-label font-bold px-3 py-1.5 rounded-xl">Apply</button>
          </div>

          <div className="bg-surface-container-low p-4 rounded-2xl font-label space-y-1">
            <div className="flex justify-between"><span>Base Price ({totalMealCount} Meals):</span><span>₹{basePrice}</span></div>
            {discountAmount > 0 && <div className="flex justify-between text-secondary font-bold"><span>Discount (20% Off):</span><span>- ₹{discountAmount}</span></div>}
            <div className="border-t pt-2 flex justify-between font-display text-sm font-extrabold text-on-surface"><span>Total Payable:</span><span className="text-primary-container">₹{finalPrice}</span></div>
          </div>

          <button onClick={handleConfirm} className="w-full bg-primary-container text-white font-display font-extrabold py-3 rounded-2xl shadow-orange-glow">
            Pay ₹{finalPrice} & Generate Digital QR Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Purchased Passes Modal
// ----------------------------------------------------
function UserPassesModal({ passes, onClose, onSelectPass }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-surface-container animate-fade-in text-xs font-body">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="font-display text-lg font-extrabold text-on-surface">My Digital Mess Passes</h3>
          <button onClick={onClose} className="text-on-surface-variant font-bold">✕</button>
        </div>

        <div className="space-y-3">
          {passes.map(p => (
            <div key={p.id} onClick={() => { onSelectPass(p); onClose(); }} className="bg-surface-container-low p-4 rounded-2xl border border-surface-container hover:border-primary-container transition cursor-pointer flex justify-between items-center">
              <div>
                <span className="bg-primary-container text-white font-label font-bold px-2 py-0.5 rounded-md text-[10px]">{p.id}</span>
                <h4 className="font-display font-extrabold text-sm text-on-surface mt-1">{p.messName}</h4>
                <p className="text-on-surface-variant text-xs">{p.planType} • {p.remainingMeals} Meals Left</p>
              </div>
              <span className="material-symbols-outlined text-primary-container text-3xl">qr_code_2</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// QR Code Ticket Modal
// ----------------------------------------------------
function QrTicketModal({ pass, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border border-surface-container animate-fade-in relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-on-surface-variant font-bold">✕</button>

        <span className="bg-secondary-container/40 text-secondary font-label font-bold text-xs px-3 py-1 rounded-full">
          ● Active Digital Ticket
        </span>
        <h3 className="font-display text-xl font-extrabold text-on-surface mt-2">{pass.messName}</h3>
        <p className="text-primary-container font-label font-bold text-xs">{pass.planType}</p>

        <div className="my-5 bg-white p-4 rounded-2xl inline-block border-4 border-primary-container shadow-inner">
          <svg viewBox="0 0 100 100" className="w-36 h-36">
            <rect width="100" height="100" fill="white" />
            <rect x="5" y="5" width="30" height="30" fill="black" />
            <rect x="9" y="9" width="22" height="22" fill="white" />
            <rect x="13" y="13" width="14" height="14" fill="black" />
            <rect x="65" y="5" width="30" height="30" fill="black" />
            <rect x="69" y="9" width="22" height="22" fill="white" />
            <rect x="73" y="13" width="14" height="14" fill="black" />
            <rect x="5" y="65" width="30" height="30" fill="black" />
            <rect x="9" y="69" width="22" height="22" fill="white" />
            <rect x="13" y="73" width="14" height="14" fill="black" />
            <rect x="40" y="40" width="20" height="20" fill="#ff6b35" />
            <rect x="45" y="45" width="10" height="10" fill="black" />
          </svg>
          <div className="text-[10px] font-mono font-bold mt-1 text-on-surface">{pass.id}</div>
        </div>

        <div className="bg-surface-container-low p-3 rounded-xl text-left text-xs font-body space-y-1">
          <div>Student: <strong className="text-on-surface">{pass.studentName}</strong></div>
          <div>Validity: <strong className="text-secondary">{pass.validUntil}</strong></div>
        </div>

        <button onClick={() => window.print()} className="mt-4 w-full bg-surface-container text-on-surface font-display font-bold py-2 rounded-xl text-xs">
          🖨️ Print Ticket PDF
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Mess Owner Dashboard
// ----------------------------------------------------
function OwnerDashboard({ messes, selectedOwnerMessId, onSelectMess, onUpdateSeatCount, onUpdateTodayMenu, onUpdateAnnouncement }) {
  const currentMess = messes.find(m => m.id === selectedOwnerMessId) || messes[0];
  const [sessionKey, setSessionKey] = useState('lunch');
  const [title, setTitle] = useState('');
  const [dishesText, setDishesText] = useState('');
  const [price, setPrice] = useState(80);
  const [announcementText, setAnnouncementText] = useState('');

  useEffect(() => {
    if (currentMess && currentMess.todayMenu[sessionKey]) {
      const sess = currentMess.todayMenu[sessionKey];
      setTitle(sess.title);
      setDishesText(sess.dishes.join(', '));
      setPrice(sess.price);
    }
  }, [sessionKey, currentMess]);

  useEffect(() => {
    if (currentMess) setAnnouncementText(currentMess.announcement || '');
  }, [currentMess]);

  const handleSaveMenu = (e) => {
    e.preventDefault();
    onUpdateTodayMenu(currentMess.id, sessionKey, {
      title,
      dishes: dishesText.split(',').map(d => d.trim()).filter(Boolean),
      price: Number(price),
      isSpecial: true
    });
  };

  return (
    <div className="space-y-6 text-xs font-body">
      <div className="bg-white p-6 rounded-3xl shadow-card-subtle border border-surface-container flex justify-between items-center">
        <div>
          <span className="bg-primary-container/10 text-primary font-label font-bold px-3 py-1 rounded-full text-xs">
            👨‍🍳 Owner Portal
          </span>
          <h2 className="font-display text-2xl font-extrabold text-on-surface mt-2">Manage Mess & Live Occupancy</h2>
        </div>

        <select
          value={selectedOwnerMessId}
          onChange={(e) => onSelectMess(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/40 text-primary font-display font-bold rounded-xl px-4 py-2"
        >
          {messes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-card-subtle border border-surface-container space-y-4">
          <h3 className="font-display text-base font-extrabold text-on-surface">Live Seat Counter</h3>
          <div className="bg-surface-container-low p-4 rounded-2xl text-center">
            <div className="text-3xl font-display font-extrabold text-primary">{currentMess.occupiedSeats} / {currentMess.capacity} Seats</div>
            <input
              type="range"
              min="0"
              max={currentMess.capacity}
              value={currentMess.occupiedSeats}
              onChange={(e) => onUpdateSeatCount(currentMess.id, parseInt(e.target.value))}
              className="w-full accent-primary-container cursor-pointer mt-4"
            />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onUpdateAnnouncement(currentMess.id, announcementText); }} className="space-y-2">
            <label className="font-label font-bold text-on-surface">Broadcast Offer Banner:</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5"
            />
            <button type="submit" className="w-full bg-surface-container text-on-surface font-display font-bold py-2 rounded-xl">Update Offer</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-card-subtle border border-surface-container space-y-4">
          <h3 className="font-display text-base font-extrabold text-on-surface">Edit Today's Menu</h3>
          <div className="flex gap-2 border-b pb-2">
            {['breakfast', 'lunch', 'snacks', 'dinner'].map(s => (
              <button
                key={s}
                onClick={() => setSessionKey(s)}
                className={`px-3 py-1 rounded-xl uppercase font-label font-bold ${sessionKey === s ? 'bg-primary-container text-white' : 'bg-surface-container text-on-surface-variant'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSaveMenu} className="space-y-3">
            <div>
              <label className="font-label font-bold text-on-surface">Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5" />
            </div>
            <div>
              <label className="font-label font-bold text-on-surface font-bold">Dishes (comma separated):</label>
              <textarea value={dishesText} onChange={(e) => setDishesText(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5 h-20" />
            </div>
            <div>
              <label className="font-label font-bold text-on-surface">Price (₹):</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl p-2.5" />
            </div>
            <button type="submit" className="w-full bg-primary-container text-white font-display font-bold py-3 rounded-2xl shadow-orange-glow">Save Menu</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
