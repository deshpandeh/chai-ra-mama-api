export const getHomeBannerData = async (setData) => {
    try { 
      const result = await fetch("/api/admin/home-banner", { next:{revalidate:1800}})
      const data = await result.json()
      setData(data?.data)
    }
    catch (err) {
      console.log("Error in home banner data" + err)
    }
  }