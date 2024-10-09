document.addEventListener('DOMContentLoaded', function() {
    const syncButtons = document.querySelectorAll('.sync-btn');
    const shareButtons = document.querySelectorAll('.share-btn');

    syncButtons.forEach(button => {
        button.addEventListener('click', function() {
            const routine = this.getAttribute('data-routine');
            const statusElement = document.getElementById(`${routine}SyncStatus`);
            statusElement.textContent = 'Syncing...';
            setTimeout(() => {
                statusElement.textContent = 'Synced to calendar successfully!';
                setTimeout(() => {
                    statusElement.textContent = '';
                }, 3000);
            }, 1500);
        });
    });

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const routine = this.getAttribute('data-routine');
            const statusElement = document.getElementById(`${routine}ShareStatus`);
            statusElement.textContent = 'Sharing...';
            setTimeout(() => {
                statusElement.textContent = 'Shared with family successfully!';
                setTimeout(() => {
                    statusElement.textContent = '';
                }, 3000);
            }, 1500);
        });
    });
});