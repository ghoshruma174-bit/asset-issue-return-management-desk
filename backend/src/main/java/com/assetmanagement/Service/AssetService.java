package com.assetmanagement.Service;

import com.assetmanagement.Entity.Asset;
import com.assetmanagement.Repository.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    // Create Asset
    public Asset createAsset(Asset asset) {
        if (asset.getStatus() == null || asset.getStatus().isBlank()) {
            asset.setStatus("Available");
        }

        return assetRepository.save(asset);
    }

    // Get all Assets
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    // Get Asset by ID
    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    // Update Asset
    public Asset updateAsset(Long id, Asset updatedAsset) {

        Asset existingAsset = assetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asset not found"));

        existingAsset.setName(updatedAsset.getName());
        existingAsset.setCategory(updatedAsset.getCategory());

        if (updatedAsset.getStatus() != null) {
            existingAsset.setStatus(updatedAsset.getStatus());
        }

        return assetRepository.save(existingAsset);
    }

    // Delete Asset
    public void deleteAsset(Long id) {

        if (!assetRepository.existsById(id)) {
            throw new RuntimeException("Asset not found");
        }

        assetRepository.deleteById(id);
    }
}
