export default function LoadingPortfolioComponent() {
    return (
        <div class="px-6 pt-24 max-w-3xl mx-auto py-20 w-full">
            <div class="flex animate-pulse space-x-4">
                <div class="flex-1 space-y-6 py-1">
                    <div id="thumbnail" className="h-48 w-full mb-4 rounded bg-gray-200"></div>
                    <div id="content" class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="col-span-2 h-2 rounded bg-gray-200"></div>
                            <div class="col-span-1 h-2 rounded bg-gray-200"></div>
                        </div>
                        <div class="h-2 rounded bg-gray-200"></div>
                        <div class="h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                        <div className="h-48 w-full mb-4 rounded bg-gray-200"></div>
                        <div className="h-48 w-full mb-4 rounded bg-gray-200"></div>
                        <div className="h-48 w-full mb-4 rounded bg-gray-200"></div>
                </div>
            </div>
        </div>
        </div >
    );
}