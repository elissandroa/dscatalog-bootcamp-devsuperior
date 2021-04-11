package com.devsuperior.dscatalog.tests.repositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.CategoryRepository;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@DataJpaTest
@SuppressWarnings("unused")
public class ProductRepositoryTest {
		
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private long countPcGamerProducts;
	private long countTotalCategories;
	private long countCategory3Products;
	private Pageable pageable;
	private long categoryId;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
		countPcGamerProducts= 21L;
		countCategory3Products = 23L;
		Pageable pageable = PageRequest.of(0, 10);
		countTotalCategories = 3L;
		categoryId = 4L;
	}
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Test
	public void findShouldReturnOnlySelectedCategoryWhenCategoryInformed() {
		
		List<Category> categories = new ArrayList<>();
		categories.add(new Category(3L, null));

		
		Page<Product> result = repository.find(categories, "", pageable);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countCategory3Products, result.getTotalElements());
	}
	
	
	
	@Test
	public void findShouldReturnAllProductsWhenCategoryNotInformed() {
		
		List<Category> categories = null;


		
		Page<Product> result = repository.find(categories, "", pageable);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnAllCategoriesWhenNamIsEmpty() {
		String name = "";


		
		List<Category> result = categoryRepository.findAll();
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalCategories, result.size());
	}
	
	
	
	@Test
	public void findShouldReturnAllProductsWhenNamIsEmpty() {
		String name = "";


		
		Page<Product> result = repository.find(null, name, pageable);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
	
	
	
	@Test
	public void findShouldReturnProductsWhenNamExistsIgnoringCase() {
		String name = "pc gAMeR";


		
		Page<Product> result = repository.find(null, name, pageable);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}
	
	
	@Test
	public void findShouldReturnProductsWhenNamExists() {
		String name = "PC Gamer";
		
		
		Page<Product> result = repository.find(null, name, pageable);
		
		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(countPcGamerProducts, result.getTotalElements());
	}
	
	@Test
	public void saveShouldPersistWhithAutoIncrementWhenIdIsNull() {
		Product product = ProductFactory.createProduct();
		product.setId(null);
		
		product = repository.save(product);
		Optional<Product> result = repository.findById(product.getId());
		
		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1L, product.getId());
		Assertions.assertTrue(result.isPresent());
		Assertions.assertSame(product, result.get());
		Assertions.assertEquals(countTotalProducts + 1L, result.get().getId());
	}
	
	@Test
	public void deleteShouldDeleteObjectWhenIdExist() {
		repository.deleteById(existingId);
		Optional<Product> result = repository.findById(existingId);
		Assertions.assertFalse(result.isPresent());
	}
	
	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenIdNotExist() {
		
		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {
			repository.deleteById(nonExistingId);
		});
	}
}
