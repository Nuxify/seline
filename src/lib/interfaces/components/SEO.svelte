<script lang="ts">
	export let title: string = ''
	export let description: string = ''
	export let type: string = ''
	export let url: string = ''

	$: pageTitle = title
	$: pageDescription = description
	$: pageType = type
	$: pageUrl = url
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="image" content="/images/cover-image.png" />
	<meta name="keywords" content="Blockchain, AI, Web2 and Web3 Development" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:site_name" content={title} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:keywords" content="Blockchain, AI, Web2 and Web3 Development" />
	<meta property="og:locale" content="en" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/images/cover-image.png" />
	<meta property="og:image:alt" content="Seline Chain Cover Logo" />

	{@html `<script type="application/ld+json">{
        "@context": "http://schema.org",
        "@type": "${pageType}",
		"url": "${pageUrl}",
		"name": "${pageTitle}",
		"description": "${pageDescription}"
        }
	</script>`}
</svelte:head>
