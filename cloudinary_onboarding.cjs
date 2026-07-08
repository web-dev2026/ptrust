const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary inline
cloudinary.config({
  cloud_name: 'gtlndrjc',
  api_key: '817365374276677',
  api_secret: 'fhsGuPNxwxwDBea6XpzWUC1IH18'
});

async function runOnboarding() {
  try {
    console.log("Starting Cloudinary onboarding...");

    // 2. Upload a sample image from Cloudinary's demo domains
    const uploadResult = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
      public_id: 'onboarding_sample'
    });
    console.log("Upload Success!");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);

    // 3. Get image details (metadata)
    console.log("\nImage Details:");
    console.log("Width:", uploadResult.width);
    console.log("Height:", uploadResult.height);
    console.log("Format:", uploadResult.format);
    console.log("File Size (Bytes):", uploadResult.bytes);

    // 4. Transform the image
    // f_auto: Automatically selects the best image format based on browser support (WebP, AVIF, etc.)
    // q_auto: Automatically optimizes the quality of the image to reduce file size without visible loss
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto',
      secure: true
    });

    console.log("\nDone! Click link below to see optimized version of the image. Check the size and the format.");
    console.log("Transformed URL:", transformedUrl);

  } catch (error) {
    console.error("Error during onboarding:", error);
  }
}

runOnboarding();
