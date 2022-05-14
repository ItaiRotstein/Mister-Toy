import { ToyPreview } from "./toy-preview"

export function ToyList({ toys, onRemoveToy, onGoToDetails}) {
    if (toys.length < 1) return <h3>Loading...</h3>
        return (
            <section className="toy-list">
                {toys.map(toy =>
                    <ToyPreview
                        key={toy._id}
                        toy={toy}
                        onRemoveToy={onRemoveToy}
                        onGoToDetails={onGoToDetails}
                    />
                )}
            </section>
        )
}