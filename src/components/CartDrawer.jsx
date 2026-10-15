import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Tag, 
  Sparkles,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { restaurantInfo } from '../data/restaurantData';

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    tax, 
    total 
  } = useCart();

  const [fulfillmentType, setFulfillmentType] = useState('pickup'); // 'pickup' or 'delivery'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'THAI10') {
      setDiscountPercent(0.10);
      setPromoMessage('Promo code applied: 10% off your feast!');
    } else if (promoCode.trim().toUpperCase() === 'SAWASDEE') {
      setDiscountPercent(0.15);
      setPromoMessage('Sawasdee! 15% VIP discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try "THAI10"');
    }
  };

  const discountAmount = subtotal * discountPercent;
  const deliveryFee = fulfillmentType === 'delivery' ? 4.99 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + tax + deliveryFee);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const id = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(id);
    setIsCheckoutCompleted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#0D472B', '#E08A3C'],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    if (isCheckoutCompleted) {
      clearCart();
      setIsCheckoutCompleted(false);
    }
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1410] border-l border-[#c59b27]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 bg-[#081812] border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-[#122b1e] text-[#c59b27] border border-[#c59b27]/40">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">Your Thai Feast</h3>
                <p className="text-[11px] text-stone-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isCheckoutCompleted ? (
            /* Order Success View */
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center overflow-y-auto">
              <div className="w-16 h-16 rounded-full bg-[#1b3d2c] border-2 border-[#c59b27] flex items-center justify-center text-[#c59b27] mb-5 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase tracking-widest text-[#c59b27] font-semibold mb-1">
                Order Received · ขอบคุณ (Khop Khun)
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                The Wok Is Firing Up!
              </h3>
              <p className="text-xs text-stone-300 max-w-xs mb-6">
                Chef Somchai and the kitchen are handcrafting your meal with fragrant herbs and authentic spices.
              </p>

              <div className="bg-[#0e1d16] p-4 rounded-xl border border-stone-800 w-full text-left space-y-2 mb-6 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span className="text-stone-400">Order Reference:</span>
                  <span className="font-mono font-bold text-[#c59b27]">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Service Mode:</span>
                  <span className="capitalize font-semibold text-white">
                    {fulfillmentType === 'pickup' ? 'Restaurant Pickup (25-30m)' : 'Express Delivery (40-50m)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Charged:</span>
                  <span className="font-bold text-emerald-400">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Contact:</span>
                  <span className="text-white">{customerPhone || 'On File'}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] text-stone-950 font-bold text-sm shadow-md"
              >
                Back to Restaurant
              </button>
            </div>
          ) : (
            /* Standard Cart & Checkout Flow */
            <>
              {/* Pickup vs Delivery Toggle */}
              <div className="px-6 py-3 bg-[#0e1d16] border-b border-stone-800/80">
                <div className="grid grid-cols-2 p-1 bg-[#12241b] rounded-full border border-stone-800">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      fulfillmentType === 'pickup'
                        ? 'bg-[#c59b27] text-stone-950 shadow'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Pickup (25–30 min)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('delivery')}
                    className={`py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      fulfillmentType === 'delivery'
                        ? 'bg-[#c59b27] text-stone-950 shadow'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Delivery (40–50 min)
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-lg text-white mb-1">Your order tray is empty</h4>
                    <p className="text-xs text-stone-400 max-w-xs mx-auto mb-6">
                      Explore our delicious dishes and add authentic Royal Thai curries, noodles, or appetizers.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#12281e] text-[#f3e5ab] border border-[#c59b27]/40 text-xs font-semibold hover:border-[#c59b27]"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-xl bg-[#0e1d16] border border-stone-800/80 flex gap-3 relative group"
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 rounded-lg object-cover bg-stone-900 shrink-0"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-stone-500 hover:text-red-400 p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Spice & Notes */}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-amber-400 flex items-center gap-0.5 font-medium">
                            <Flame className="w-3 h-3 fill-amber-400" />
                            {item.selectedSpice === 0
                              ? 'Mild'
                              : item.selectedSpice === 1
                              ? 'Spice 1'
                              : item.selectedSpice === 2
                              ? 'Medium (2)'
                              : 'Thai Hot (3)'}
                          </span>
                          {item.notes && (
                            <span className="text-[10px] text-stone-400 truncate max-w-[120px]">
                              Note: {item.notes}
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity Adjuster */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs font-serif font-bold text-[#f3e5ab]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 bg-[#12241b] rounded-full border border-stone-800 px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="text-stone-400 hover:text-white p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-white min-w-[1rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="text-stone-400 hover:text-white p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Summary & Checkout Form */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#081812] border-t border-stone-800 space-y-4">
                  {/* Promo Code Simulator */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. THAI10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#12241b] border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-[#c59b27] hover:text-black text-xs font-semibold text-stone-200 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {promoMessage && (
                    <p className={`text-[11px] ${discountPercent > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {promoMessage}
                    </p>
                  )}

                  {/* Price breakdown */}
                  <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800/80 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-stone-200">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>VIP Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    {fulfillmentType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span className="text-stone-200">${deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Estimated Tax (Los Angeles 10.25%)</span>
                      <span className="text-stone-200">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-white pt-2 border-t border-stone-800">
                      <span>Total</span>
                      <span className="text-[#f3e5ab]">${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Customer Quick Checkout Inputs */}
                  <form onSubmit={handlePlaceOrder} className="space-y-2.5 pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="bg-[#12241b] border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27]"
                      />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="bg-[#12241b] border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27]"
                      />
                    </div>
                    {fulfillmentType === 'delivery' && (
                      <input
                        type="text"
                        required
                        placeholder="Delivery Street Address *"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-[#12241b] border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#c59b27]"
                      />
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-gradient-to-r from-[#c59b27] to-[#aa771c] hover:brightness-110 active:scale-95 text-stone-950 font-bold text-sm shadow-xl shadow-[#c59b27]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>Place Order · ${finalTotal.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4 text-stone-950" />
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
