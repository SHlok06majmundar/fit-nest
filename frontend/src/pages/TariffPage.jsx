"use client"

import { useContext, useEffect, useState } from "react"
import "./TariffPage.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"
import { useSocket } from "../context/SocketContext"

const TariffPage = () => {
  const navigate = useNavigate()
  const { Authuser } = useAuthContext()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingplan, setLoadingplan] = useState(false)

  const { socket } = useSocket()
  const location = useLocation()
  const { Status } = location.state || { Status: "not-valid" }
  console.log(Status, "fom location", typeof Status)

  const fetchPlans = async () => {
    try {
      setLoadingplan(true)
      const response = await axios.get(`http://16.176.121.1/api/Admin/AllMembershipPlans`)
      setPlans(response.data)
    } catch (err) {
      setLoadingplan(false)
      console.log(err)
    } finally {
      setLoadingplan(false)
    }
  }

  const FetchUserById = async () => {
    if (Authuser) {
      try {
        setLoading(true)
        const response = await axios.get(`http://16.176.121.1/api/users/GetUserById/${Authuser._id}`, {
          withCredentials: true,
        })
        localStorage.setItem("gym-user", JSON.stringify(response.data))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const getPlanPricing = (title) => {
    title = title.toLowerCase()

    const pricingMap = {
      monthly: { months: 1, originalPrice: 1599, discountedPrice: 1599 },
      bimonthly: { months: 2, originalPrice: 1599 * 2, discountedPrice: 2999 },
      quarterly: { months: 3, originalPrice: 1599 * 3, discountedPrice: 4299 },
      quadrimester: { months: 4, originalPrice: 1599 * 4, discountedPrice: 4999 },
      semiannual: { months: 6, originalPrice: 1599 * 6, discountedPrice: 6999 },
      annual: { months: 12, originalPrice: 1599 * 12, discountedPrice: 12999 },
    }

    let pricing

    if (
      title.includes("monthly") ||
      title.includes("1 month") ||
      title.includes("one month") ||
      title.includes("30 days")
    ) {
      pricing = pricingMap.monthly
    } else if (
      title.includes("bi-monthly") ||
      title.includes("2 month") ||
      title.includes("two month") ||
      title.includes("60 days")
    ) {
      pricing = pricingMap.bimonthly
    } else if (
      title.includes("quarterly") ||
      title.includes("3 month") ||
      title.includes("three month") ||
      title.includes("90 days")
    ) {
      pricing = pricingMap.quarterly
    } else if (
      title.includes("quadrimester") ||
      title.includes("4 month") ||
      title.includes("four month") ||
      title.includes("120 days")
    ) {
      pricing = pricingMap.quadrimester
    } else if (
      title.includes("semi-annual") ||
      title.includes("6 month") ||
      title.includes("six month") ||
      title.includes("180 days")
    ) {
      pricing = pricingMap.semiannual
    } else if (
      title.includes("annual") ||
      title.includes("12 month") ||
      title.includes("twelve month") ||
      title.includes("360 days")
    ) {
      pricing = pricingMap.annual
    } else {
      pricing = pricingMap.monthly
    }

    return {
      originalPrice: `₹${pricing.originalPrice.toLocaleString("en-IN")}/-`,
      buyAtPrice: `₹${pricing.discountedPrice.toLocaleString("en-IN")}/-`,
      saving: pricing.originalPrice - pricing.discountedPrice,
      discountPercentage: Math.round(((pricing.originalPrice - pricing.discountedPrice) / pricing.originalPrice) * 100),
    }
  }

  // ... keep existing code (useEffect hooks for fetching data, scrolling, and socket events)
  useEffect(() => {
    FetchUserById()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    socket.on("MembershipPlanChanges", (change) => {
      fetchPlans()
    })
    socket.on("UserChanges", (change) => {
      localStorage.setItem("gym-user", JSON.stringify(change))
      FetchUserById()
    })
    return () => {
      socket.off("MembershipPlanChanges")
      socket.off("UserChanges")
    }
  }, [socket])

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleBuyNow = (plan) => {
    if (!Authuser && Status === "null") {
      navigate(`/BUY-MEMBERSHIP/${encodeURIComponent(plan.title)}/${encodeURIComponent(plan.discountedPrice)}`)
    } else if (!Authuser && Status === "Expired") {
      navigate(`/BUY-MEMBERSHIP/${encodeURIComponent(plan.title)}/${encodeURIComponent(plan.discountedPrice)}`)
    } else if (!Authuser && Status === "not-valid") {
      navigate(`/new-membership-buy/${encodeURIComponent(plan.title)}/${encodeURIComponent(plan.discountedPrice)}`)
    } else {
      navigate(
        `/PayForMembership/${encodeURIComponent(plan.title)}/${encodeURIComponent(
          plan.discountedPrice,
        )}/${Authuser._id}`,
      )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-green-500"></div>
      </div>
    )
  }

  if (loadingplan) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="tariff-page relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gym-equipment" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <g transform="translate(50, 50)">
                  <rect x="-40" y="-5" width="80" height="10" rx="5" fill="#4ade80" />
                  <circle cx="-40" cy="0" r="15" fill="#4ade80" />
                  <circle cx="40" cy="0" r="15" fill="#4ade80" />
                </g>
                <g transform="translate(150, 150)">
                  <circle cx="0" cy="10" r="20" fill="#4ade80" />
                  <rect x="-5" y="-20" width="10" height="25" rx="2" fill="#4ade80" />
                  <circle cx="0" cy="-20" r="8" fill="#4ade80" />
                </g>
                <g transform="translate(150, 50) rotate(45)">
                  <rect x="-60" y="-3" width="120" height="6" rx="3" fill="#4ade80" />
                  <rect x="-75" y="-10" width="20" height="20" rx="2" fill="#4ade80" />
                  <rect x="55" y="-10" width="20" height="20" rx="2" fill="#4ade80" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gym-equipment)" />
          </svg>
        </div>
        <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-green-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-green-600/10 blur-3xl"></div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(45deg, #4ade80 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center p-8">
        {Authuser?.membership_details?.status?.toLowerCase() === "active" && (
          <div className="membership-active">
            <div className="membership-card">
              <h1 className="membership-title">🎉 Membership Activated 🎉</h1>
              <p className="info-text">You can buy a new plan only after your current membership expires.</p>
              <div className="membership-details">
                <div className="membership-row">
                  <span className="membership-label">Type:</span>
                  <span className="membership-value">{Authuser.membership_details.membership_type}</span>
                </div>
                <div className="membership-row">
                  <span className="membership-label">Start Date:</span>
                  <span className="membership-value">
                    {new Date(Authuser.membership_details.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="membership-row">
                  <span className="membership-label">End Date:</span>
                  <span className="membership-value">
                    {new Date(Authuser.membership_details.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {Authuser?.membership_details?.status?.toLowerCase() === "expired" && (
          <div className="membership-active">
            <div className="membership-card">
              <h1 className="membership-title">🎉 Membership Expired 🎉</h1>
              <p className="info-text">Previous Membership has been expired. You can buy a new plan now.</p>
              <p>Previous Membership Details:</p>
              <div className="membership-details">
                <div className="membership-row">
                  <span className="membership-label">Type:</span>
                  <span className="membership-value">{Authuser.membership_details.membership_type}</span>
                </div>
                <div className="membership-row">
                  <span className="membership-label">Start Date:</span>
                  <span className="membership-value">
                    {new Date(Authuser.membership_details.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="membership-row">
                  <span className="membership-label">End Date:</span>
                  <span className="membership-value">
                    {new Date(Authuser.membership_details.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="tariff-container">
          {plans.length === 0 ? (
            <h1 className="text-5xl">No plans found</h1>
          ) : (
            plans.map((plan, index) => {
              const pricingDetails = getPlanPricing(plan.title)

              return (
                <div key={index} className="tariff-card hover-scale">
                  <h2 className="card-title">{plan.title}</h2>
                  <p className="card-description">{plan.description}</p>
                  <div className="divider"></div>
                  <p className="disprice font-bold text-2xl font-poppins">Buy at {pricingDetails.buyAtPrice}</p>
                  <p className="price">Original: {pricingDetails.originalPrice}</p>
                  {pricingDetails.saving > 0 && (
                    <p className="saving text-green-400 text-sm mt-1">
                      Save {pricingDetails.discountPercentage}% (₹{pricingDetails.saving.toLocaleString("en-IN")})
                    </p>
                  )}
                  <div className="divider"></div>
                  <button
                    onClick={() => handleBuyNow(plan)}
                    className={`buy-button ${Authuser?.membership_details?.status === "Active" ? "disabled" : ""}`}
                    disabled={Authuser?.membership_details?.status === "Active"}
                  >
                    Buy Now
                  </button>
                </div>
              )
            })
          )}
        </div>

        {Authuser?.membership_details?.status === "Expired" && (
          <div className="membership-expired">
            <h1 className="membership-title">Membership Expired</h1>
            <p className="info-text">Your membership has expired. Renew to continue enjoying our services.</p>
          </div>
        )}
      </div>

      {/* Dumbbell in right bottom */}
      <div className="absolute bottom-10 right-10 h-24 w-24 animate-pulse opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4ade80">
          <path d="M104 96c-13.3 0-24 10.7-24 24v12H64c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h16v12c0 13.3 10.7 24 24 24s24-10.7 24-24V132c0-13.3-10.7-24-24-24zm304 0c-13.3 0-24 10.7-24 24v140c0 13.3 10.7 24 24 24s24-10.7 24-24V260h16c13.3 0 24-10.7 24-24V156c0-13.3-10.7-24-24-24h-16v-12c0-13.3-10.7-24-24-24zM208 128h96c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16z" />
        </svg>
      </div>

      {/* Dumbbell in top left */}
      <div className="absolute left-10 top-10 h-24 w-24 animate-bounce opacity-20" style={{ animationDelay: "0.3s" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4ade80">
          <path d="M104 96c-13.3 0-24 10.7-24 24v12H64c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h16v12c0 13.3 10.7 24 24 24s24-10.7 24-24V132c0-13.3-10.7-24-24-24zm304 0c-13.3 0-24 10.7-24 24v140c0 13.3 10.7 24 24 24s24-10.7 24-24V260h16c13.3 0 24-10.7 24-24V156c0-13.3-10.7-24-24-24h-16v-12c0-13.3-10.7-24-24-24zM208 128h96c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16z" />
        </svg>
      </div>
    </div>
  )
}

export default TariffPage
