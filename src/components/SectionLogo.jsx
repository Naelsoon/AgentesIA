import ShapeGrid from './ShapeGrid';

export default function SectionLogo() {
    return (
        <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <ShapeGrid 
                    borderColor="#333"
                    squareSize={50}
                    hoverFillColor="#5227FF"
                    speed={0.8}
                    shape="square"
                    hoverTrailAmount={3}
                />
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="heroTitle">
                    <h1>THE NEXT ERA OF </h1>
                    <span className="highlight-ai">AI</span>
                </div>

                <div className="heroText">
                    <p>Uma coleção de modelos construídos para operar de acordo com suas necessidades</p>
                </div>
            </div>
            
        </section>
    );
}