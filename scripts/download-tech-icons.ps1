# PowerShell script to download jsDelivr tech icons locally for Next.js caching
$techDir = "public/images/tech"
if (!(Test-Path $techDir)) {
    New-Item -ItemType Directory -Path $techDir | Out-Null
}

$base = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons"
$icons = @(
    @{name="react"; url="$base/react/react-original.svg"},
    @{name="nextjs"; url="$base/nextjs/nextjs-original.svg"},
    @{name="javascript"; url="$base/javascript/javascript-original.svg"},
    @{name="css3"; url="$base/css3/css3-original.svg"},
    @{name="html5"; url="$base/html5/html5-original.svg"},
    @{name="typescript"; url="$base/typescript/typescript-original.svg"},
    @{name="woocommerce"; url="$base/woocommerce/woocommerce-original.svg"},
    @{name="nodejs"; url="$base/nodejs/nodejs-original.svg"},
    @{name="python"; url="$base/python/python-original.svg"},
    @{name="mongodb"; url="$base/mongodb/mongodb-original.svg"},
    @{name="django"; url="$base/django/django-plain.svg"},
    @{name="figma"; url="$base/figma/figma-original.svg"},
    @{name="bootstrap"; url="$base/bootstrap/bootstrap-original.svg"},
    @{name="wordpress"; url="$base/wordpress/wordpress-plain.svg"}
)

foreach ($icon in $icons) {
    $dest = "$techDir/$($icon.name).svg"
    Invoke-WebRequest -Uri $icon.url -OutFile $dest
}

Write-Host "Done. Update techStackCategories icon paths to /images/tech/[name].svg"